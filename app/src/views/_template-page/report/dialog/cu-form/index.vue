<script lang="ts">
import type { __SkAppForm } from '@skzz/platform/components/app-form'
import type { PropType } from 'vue'
import type { Row } from '../types'
import { SkAppForm } from '@skzz/platform/components/app-form'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SkAppForm,
  },
  props: {
    data: {
      type: Object as PropType<Partial<Row>>,
      required: true,
    },
  },
  emits: {
    submit: (data: Row) => data,
  },
  setup (props, { emit }) {
    const formItems: __SkAppForm.FormItem<keyof Row>[] = [
      {
        templateType: 'VkfInput',
        prop: 'name',
        label: '姓名',
      },
      {
        templateType: 'VkfInput',
        prop: 'roleId',
        label: '编码',
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
    :data="data"
    :form-items="formItems"
  ></SkAppForm>
</template>
