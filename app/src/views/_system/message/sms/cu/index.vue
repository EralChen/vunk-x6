<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cuSms, rSmsList, CSms } from '@skzz-platform/api/system/message'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { ElMessage, FormInstance } from 'element-plus'
import { SkAppCard } from '@skzz/platform'
import PageX from '_c/PageX/index.vue'
import { setData } from '@vunk/core'
import { ref } from 'vue'
import router from '@/router'


const props = defineProps({
  id: {
    type: String,
  },
  detail: Boolean,
})
const firstFormData = ref({
  id: props.id,
} as CSms)

const header = ref(props.detail ? '详情' : props.id ? '修改' : '新增')

const defer = new Deferred<FormInstance>()

const formItems = ref<__SkAppForm.CoreFormItem[]>([
  {
    templateType: 'VkfInput',
    prop: 'sender',
    label: '发送人',
  },
  {
    templateType: 'VkfInput',
    prop: 'appKey',
    label: 'appKey',
  },
  {
    templateType: 'VkfInput',
    prop: 'appSecret',
    label: 'appSecret',
  },
  {
    templateType: 'VkfInput',
    prop: 'url',
    label: 'url',
  },
  {
    templateType: 'VkfInput',
    prop: 'statusCallBack',
    label: 'statusCallBack',
  },
])
const rules = ref({
  sender: [
    {
      required: true,
      message: '请输入发送人',
      trigger: 'blur',
    },
  ],
  appKey: [
    {
      required: true,
      message: '请输入appKey',
      trigger: 'blur',
    },
  ],
  appSecret: [
    {
      required: true,
      message: '请输入appSecret',
      trigger: 'blur',
    },
  ],
  url: [
    {
      required: true,
      message: '请输入url',
      trigger: 'blur',
    },
  ],
  statusCallBack: [
    {
      required: true,
      message: '请输入statusCallBack',
      trigger: 'blur',
    },
  ],
})

const r = () => {
  rSmsList(undefined, { id: props.id })
    .then(res => {
      firstFormData.value = res.rows[0]
    })
}
props.id && r()
const c = () => {
  defer.promise.then((form) => {
    return form.validate()
  })
    .then((valid) => {
      if (valid) {
        return cuSms(firstFormData.value, !!props.id)
      }
    })
    .catch(err => {
      ElMessage.warning('请检查表单')
    })
    .then(() => {
      router.push('/system/message/sms')
    })
}

</script>
<template>
  <PageX>
    <SkAppCard class="h-100%" :header="`短信${header}`">
      <template #header__options>
        <ElButton type="primary" @click="c">提交</ElButton>
      </template>

      <ElScrollbar>
        <div class="gap-form-x">
          <SkAppForm :elRef="defer.resolve" :disabled="props.detail" :rules="rules" :labelPosition="'top'" :layout="true" :formItems="formItems"
            :data="firstFormData" @setData="setData(firstFormData, $event)">
          </SkAppForm>
        </div>
      </ElScrollbar>
    </SkAppCard>
  </PageX>
</template>
