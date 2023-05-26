<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { PATTERN } from '@skzz-platform/shared/utils-form'
import { BoundApplication } from '@skzz-platform/api/platform/application'

export default defineComponent({
  components: {
    SkAppForm,
  },
  props: {
    data: {
      type: Object as PropType<Partial<BoundApplication>>,
      required: true,
    },
  },
  emits: {
    submit: (data: BoundApplication) => data,
  },
  setup (props, { emit }) {
    const formItems: __SkAppForm.FormItem<keyof BoundApplication>[] = [
      {
        templateType: 'VkfInput',
        prop: 'applicationId',
        label: '应用ID',
        maxlength: 10,
        disabled: true,
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
        prop: 'tenantId',
        label: '租户ID',
        templateType: 'VkfInput',
        disabled: true,
        required: true,
      },

      {
        prop: 'adminUser',
        label: '账号',
        templateType: 'VkfInput',
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
        prop: 'adminPassword',
        label: '密码',
        templateType: 'VkfInput',
        showPassword: true,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.password,
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
          emit('submit', props.data as BoundApplication)
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
    :label-width="'6em'"
    :data="data"
    :form-items="formItems"
  />
</template>
