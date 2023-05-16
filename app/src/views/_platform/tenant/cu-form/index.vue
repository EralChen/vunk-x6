<script lang="ts">
import { defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Row } from '../types'
import { PATTERN } from '@skzz-platform/shared/utils-form'

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
        maxlength: 10,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.code,
          },
        ],
      },
      {
        templateType: 'VkfInput',
        prop: 'name',
        label: '租户名称',
        maxlength: 10,
        rules: [
          {
            pattern: PATTERN.normal,
          },
        ],
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
