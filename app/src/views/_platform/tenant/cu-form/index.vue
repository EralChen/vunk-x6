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
        prop: 'tenantId',
        label: '租户ID',
        required: true,
      },
      {
        templateType: 'VkfInput',
        prop: 'name',
        label: '姓名',
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
    :labelWidth="'5em'"
    :data="data"
    :formItems="formItems"
  ></SkAppForm>
</template>
