<script lang="ts">
import { defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Row } from '../types'

export default defineComponent({
  components: {
    SkAppForm,
  },
  props: ['data'],
  emits: {
    submit: (data: Row) => data,
  },
  setup (props, { emit }) {
    const formItems: __SkAppForm.FormItem<keyof Row>[] = [
      {
        templateType: 'VkfInput',
        prop: 'applicationId',
        label: '应用ID',
        required: true,
      },
      {
        templateType: 'VkfInput',
        prop: 'name',
        label: '名称',
        required: true,
      },

      {
        templateType: 'VkfSelect',
        prop: 'client',
        label: '所属客户端',
      },
      
      // {
      //   templateType: 'VkfInput',
      //   prop: 'tenantId',
      //   label: '租户ID',
      // },

      {
        prop: 'memo',
        label: '备注',
        templateType: 'VkfInput',
        type: 'textarea',
        rows: 5,
      },


      {
        templateType: 'VkfButton',
        buttonLabel: '提交',
        type: 'primary',
        size: 'large',
        class: 'is-btn-group',
        onClick: () => {
          emit('submit', props.data)
        },
      },
      
    ]
    return {
      formItems,
    }
  },
})
</script>
<template>
  <SkAppForm 
    :labelWidth="'6em'"
    :data="data"
    :formItems="formItems"
  ></SkAppForm>
</template>
