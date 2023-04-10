<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { reactive, ref } from 'vue'
import PageX from '_c/PageX/index.vue'
import { SkAppCard } from '@skzz/platform'
import { setData } from '@vunk/core'
import { cuTemplate, rTemplateList, CMessageTemplate } from '@skzz-platform/api/system/message'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { FormInstance } from 'element-plus/es/components/form'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { Option } from '@skzz-platform/api/system/dictionary'
import { useDictionaryStore } from '@/stores/dictionary'

const props = defineProps({
  id: {
    type: String,
  },
  detail: Boolean,
})
const firstFormData = ref({
  id: props.id,
} as CMessageTemplate)

const dicStore = useDictionaryStore()
const clientOpts = ref<Option[]>([])
// 获取字典
dicStore.getTemplateDic(clientOpts)

const formItems = ref< __SkAppForm.CoreFormItem[]>([
  {
    templateType: 'VkfInput',
    prop: 'title',
    label: '标题',
  },
  {
    templateType: 'VkfInput',
    prop: 'clientTemplateId',
    label: '三方模版id',
  },
  {
    templateType: 'VkfSelect',
    prop: 'client',
    label: '接收端',
    allowCreate: true,
    filterable: true,
    options: clientOpts as any,
  },
  {
    templateType: 'VkfInput',
    prop: 'tpl',
    label: '模板',
  },
  // templateIf: 'return data.client === 1',
])
const rules = reactive({
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
  ],
  clientTemplateId: [
    {
      required: true,
      message: '请输入三方模版id',
      trigger: 'blur',
    },
  ],
  client: [
    {
      required: true,
      message: '请选择接收端',
      trigger: 'blur',
    },
  ],
  tpl: [
    {
      required: true,
      message: '请输入模板',
      trigger: 'blur',
    },
  ],
})
const defer = new Deferred<FormInstance>()

const r = () => {
  rTemplateList(undefined, { id: props.id }).then((res) => {
    firstFormData.value = res.rows[0]
  })
}
props.id && r()
const c = async () => {
  const form = await defer.promise
  form.validate()
    .then(() => {
      return cuTemplate(firstFormData.value, !!props.id)
    })
    .then(() => {
      router.replace('/system/message/template')
    })
    .catch(() => {
      ElMessage.error('请检查输入')
    })
}
</script>
<template>
  <PageX>
    <SkAppCard class="h-100%" :header="'新增消息模板'">
      <template #header__options>
        <ElButton type="primary" @click="c" v-if="!props.detail">提交</ElButton>
      </template>

      <ElScrollbar>
        <div class="gap-form-x">
          <SkAppForm :disabled="props.detail" :labelPosition="'top'" :layout="true" :formItems="formItems" :data="firstFormData"
            @setData="setData(firstFormData, $event)" :elRef="defer.resolve" :rules="rules">
          </SkAppForm>
        </div>
      </ElScrollbar>
    </SkAppCard>
  </PageX>
</template>
