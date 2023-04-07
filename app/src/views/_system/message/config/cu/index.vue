<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cuMessageConfig, rMessageConfigList } from '@skzz-platform/api/system/message/config'
import { MessageConfig } from '@skzz-platform/api/system/message/config/types'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { ElMessage, FormInstance } from 'element-plus'
import { SkAppCard } from '@skzz/platform'
import PageX from '_c/PageX/index.vue'
import { setData } from '@vunk/core'
import { ref } from 'vue'
import router from '@/router'
import { Option } from '@skzz-platform/api/system/dictionary'
import { rTemplateList } from '@skzz-platform/api/system/message/template'
import { useDictionaryStore } from '@/stores/dictionary'

const props = defineProps({
  id: {
    type: String,
  },
  detail: Boolean,
})
const firstFormData = ref({
  id: props.id,
} as MessageConfig)
const defer = new Deferred<FormInstance>()
const dicStore = useDictionaryStore()
const templOptions = ref<Option[]>([])
rTemplateList().then((res) => {
  templOptions.value = res.rows.map((item) => {
    return {
      label: item.title,
      value: item.id,
    }
  })
})
const clientOpts = ref<Option[]>([])
// 获取字典
dicStore.getTemplateDic(clientOpts)
const formItems = ref<__SkAppForm.CoreFormItem[]>([
  {
    templateType: 'VkfInput',
    prop: 'modelId',
    label: '模型ID',
  },
  {
    templateType: 'VkfInput',
    prop: 'datasetId',
    label: '数据集ID',
  },
  {
    templateType: 'VkfInput',
    prop: 'path',
    label: '跳转路由',
  },
  {
    templateType: 'VkfInput',
    prop: 'param',
    label: '路由参数',
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
    templateType: 'VkfSelect',
    prop: 'tplId',
    label: '消息模板',
    filterable: true,
    options: templOptions as any,
  },
  {
    // 来自常量管理
    templateType: 'VkfInput',
    prop: 'type',
    label: '业务类型',
  },
  {
    templateType: 'VkfRadio',
    prop: 'requireRead',
    label: '要求已读回执',
    options: [
      {
        label: '是',
        value: 1,
      },
      {
        label: '否',
        value: 0,
      },
    ],
  },
  {
    templateType: 'VkfRadio',
    prop: 'requireConfirm',
    label: '要求确认回执',
    options: [
      {
        label: '是',
        value: 1,
      },
      {
        label: '否',
        value: 0,
      },
    ],
  },
])
const rules = ref({
  modelId: [
    {
      required: true,
      message: '请输入模型ID',
      trigger: 'blur',
    },
  ],
  datasetId: [
    {
      required: true,
      message: '请输入数据集ID',
      trigger: 'blur',
    },
  ],
  path: [
    {
      required: true,
      message: '请输入跳转路由',
      trigger: 'blur',
    },
  ],
  param: [
    {
      required: true,
      message: '请输入路由参数',
      trigger: 'blur',
    },
  ],
  client: [
    {
      required: true,
      message: '请输入接收端',
      trigger: 'blur',
    },
  ],
  tplId: [
    {
      required: true,
      message: '请选择消息模板',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '请输入业务类型',
      trigger: 'blur',
    },
  ],
  requireRead: [
    {
      required: true,
      message: '请选择要求已读回执',
      trigger: 'blur',
    },
  ],
  requireConfirm: [
    {
      required: true,
      message: '请选择要求确认回执',
      trigger: 'blur',
    },
  ],
})

const r = () => {
  rMessageConfigList(undefined, { id: props.id })
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
        return cuMessageConfig(firstFormData.value, !!props.id)
      }
    })
    .catch(err => {
      ElMessage.warning('请检查表单')
    })
    .then(() => {
      router.push('/system/message/config')
    })
}

</script>
<template>
  <PageX>
    <SkAppCard class="h-100%" :header="'新增消息配置'">
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
