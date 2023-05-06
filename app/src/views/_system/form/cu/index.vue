<template>
  <PageX>
    <SkAppCard class="h-100%" :header="`${props.isDetail ?  '查看' : props.id ? '修改' : '新增' }表单配置`">
      <template #header__options>
        <ElButton v-if="!props.isDetail" type="primary" @click="cu">提交</ElButton>
      </template>
      <div class="h-full">
        <VkDuplex class="h-full">
          <template #one>
            <SkAppForm :disabled="!!props.id" :layout="true" :elRef="formDef.resolve" :data="formData" @setData="setData(formData, $event)" :formItems="formItems" class="mt-20px ml-20px mr-20px" ></SkAppForm>
          </template>
          <SkAppFormaker class="h-full" :data="data" @setData="setData(data, $event)" :formItems="formMakerItems"
            @setData:formItems="setData(formMakerItems, $event)" @unsetData:formItems="unsetData(formMakerItems, $event)"
            :canU="canU"></SkAppFormaker>
        </VkDuplex>
      </div>
    </SkAppCard>
  </PageX>
</template>

<script setup lang="ts">
import PageX from '_c/PageX/index.vue'
import { SkAppCard, SkAppFormaker } from '@skzz/platform'
import { NormalObject, setData, unsetData, VkDuplex } from '@vunk/core'
import { Ref, reactive, ref } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { ElMessage, FormInstance } from 'element-plus'
import { FIRS, cuForm, rFormDetail } from '@skzz/platform/api/system/form'
import router from '@/router'

const props = defineProps({
  id: {
    type: String,
  },
  isDetail: {
    type: Boolean,
    default: false,
  },
})
const formDef = new Deferred<FormInstance>()
const canU = ref<boolean>()
const data = ref<NormalObject>({})
const formMakerItems = ref([]) as Ref<FIRS[]>
const formData = reactive({
  formName: '',
})

async function rDetail () {
  if (props.id) {
    const res = await rFormDetail(props.id)
    formMakerItems.value = res.form
    formData.formName = res.formName
  }
}
props.id && rDetail()
const formItems = ref<__SkAppForm.FormItem<any>[]>([
  {
    prop: 'formName',
    templateType: 'VkfInput',
    label: '表单名称',
    placeholder: '请输入表单名称',
    rules: {
      required: true,
      validator: (rule: any, value: string, callback: any) => {
        const regEn = /[`~!@#$%^&*()_+=<>?:"{},.\/;'[\]-]/im
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
        if (value === '' || value === undefined) {
          callback(new Error('请输入表单名！'))
        } else if (/^\d/.test(value)) {
          callback(new Error('表单名不能以数字开头！'))
        } else if (regEn.test(value) || regCn.test(value)) {
          callback(new Error('表单名不能出现特殊字符！'))
        } else {
          callback()
        }
      },
    },
  },
])

async function cu () {
  const formInstance = await formDef.promise
  try {
    const valid = await formInstance.validate()
    if (valid) {
      if (!formMakerItems.value.length) {
        ElMessage.warning('请拖拽表单项！')
        return
      }
      await cuForm(formMakerItems.value, formData.formName, props.id)
      router.replace('/system/form/list')
    }
    
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped></style>