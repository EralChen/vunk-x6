<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { reactive, ref } from 'vue'
import PageX from '_c/PageX/index.vue'
import {
  SkAppModule,
  SkAppCard,
} from '@skzz/platform'

import { setData } from '@vunk/core'

const firstFormData = reactive<any>({

})

const formItems: __SkAppForm.CoreFormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'title',
    label: '标题', 
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
    prop: 'clientTemplateId',
    label: '三方模版id',
  },
  {
    templateType: 'VkfSelect',
    prop: 'client',
    label: '接收端',
    options: [
      {
        label: '微信',
        value: 1,
      },
      {
        label: '短信',
        value: 2,
      },
    ],
  },
  {
    templateType: 'VkfInput',
    prop: 'tpl',
    label: '模板',
    templateIf: 'return data.client === 1',
  },
] 

const c = () => {
  //
}
</script>
<template>
  <PageX>
    <SkAppCard class="h-100%" :header="'新增消息模板'">
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
