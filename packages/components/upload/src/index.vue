<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, nextTick, shallowRef, watch } from 'vue'
import { VkfUpload, _VkfUploadCtx } from '@vunk/form/components/upload'
import { upload, rFile } from '@skzz-platform/api/basic'
import { UploadRequestHandler, UploadUserFile } from 'element-plus'
import { useModelComputed } from '@vunk/core/composables'
import { ApiReturnType, NormalObject } from '@vunk/core'

type UploadSkzzFile = UploadUserFile & {
  raw?: File & {
    promise: Promise<any>
    controller: AbortController
  }
  response: ApiReturnType<typeof rFile>['response']
}

export default defineComponent({
  name: 'SkUpload',
  components: {
    VkfUpload,
  },
  props,
  emits,
  setup (props, { emit }) {
    const coreProps = _VkfUploadCtx.createBindProps(props, ['httpRequest', 'onRemove', 'fileList', 'beforeRemove' ])
    const coreEmits = _VkfUploadCtx.createOnEmits(emit, ['remove'])

    const fileList = useModelComputed({
      default: [] as UploadSkzzFile[],
      key: 'fileList',
    }, props, emit)
    const fileListUpdating = shallowRef(false)
    const getFileIds = () => {
      return fileList.value.reduce((a, c) => {
        if (c.response?.fileId) {
          a.push(c.response.fileId)
        }
        return a
      }, [] as string[]).join()
    }
    const syncModelValue = () => {
      fileListUpdating.value = true
      emit('update:modelValue', getFileIds())
      nextTick(() => {
        fileListUpdating.value = false
      })
    }


    const httpRequest: UploadRequestHandler = (e) => {
      const controller = new AbortController()

      const promise = upload({
        dirId: '',
        uploads: e.file,
      }, {
        signal: controller.signal,
      }) 
      ;(e.file as NormalObject).promise = promise
      ;(e.file as NormalObject).controller = controller
      return promise
    }

    const beforeRemove = (file, files) => {
      if (file.raw) {
        (file.raw as NormalObject)?.controller?.abort()
      }
      props.beforeRemove?.(file, files)
      return true
    }

    const onSuccess = (
      response, 
      uploadFile,
      uploadFiles,
    ) => {
      syncModelValue()
      props.onSuccess?.(response, uploadFile, uploadFiles)
    }
    const onRemove = (e) => {
      syncModelValue()
      props.onRemove?.(e)
    }

    
    watch(() => props.modelValue, (v) => {
      // fileListUpdating 引起的更变 无需监听
      if (fileListUpdating.value) return

      if (!v) {
        fileList.value = []
        return
      }
  
      const fileIds = v.split(',')

      Promise.all(
        fileIds.map(fileId => rFile({ fileId })),
      ).then(res => {
        fileList.value = res
      })
 

    }, {
      immediate: true,
    })
    

    return {
      httpRequest,
      coreProps,
      coreEmits,
      fileList,
      beforeRemove,
      onSuccess,
      onRemove,
    }
  },
})
</script>
<template>
  <VkfUpload
    v-model:fileList="fileList"
    :http-request="httpRequest"
    :before-remove="beforeRemove"
    v-bind="coreProps"
    :on-success="onSuccess"
    :on-remove="onRemove"
    v-on="coreEmits"
    @remove="onRemove"
  >
  </VkfUpload>
</template>
