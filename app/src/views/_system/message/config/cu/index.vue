<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { onUpdated, reactive, ref } from 'vue'
import PageX from '_c/PageX/index.vue'
import {
  SkAppModule,
  SkAppCard,
} from '@skzz/platform'

import { setData } from '@vunk/core'

const firstFormData = reactive({

})

const formItems: __SkAppForm.CoreFormItem[] = [
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
    templateType: 'VkfInput',
    prop: 'client',
    label: '接收端',
  },
  {
    templateType: 'VkfSelect',
    prop: 'tplId',
    label: '消息模板',
    options: [
      {
        label: '模板1',
        value: 1,
      },
      {
        label: '模板2',
        value: 2,
      },
    ],
  },
  {
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
] 

const c = () => {
  //
}

</script>
<template>
  <PageX>
    <SkAppCard class="h-100%" :header="'新增消息配置'">
      <template #header__options>
        <ElButton type="primary"
          @click="c"
        >提交</ElButton>
      </template>

      <ElScrollbar>
        <div class="gap-form-x"> 
          <SkAppForm :labelPosition="'top'" :layout="true" :formItems="formItems" 
            :data="firstFormData" @setData="setData(firstFormData, $event)">
          </SkAppForm>
        </div>
      </ElScrollbar>
    </SkAppCard>
  </PageX>
</template>
