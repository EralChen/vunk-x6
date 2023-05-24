<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cuRole } from '@skzz-platform/api/system/role'
import { FirstParameter } from '@vunk/core'
import { PATTERN } from '@skzz-platform/shared/utils-form'
export type Row = FirstParameter<typeof cuRole>
  
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
        label: '角色名称',
        maxlength: 10,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.normal,
          },
        ],

      },
      {
        templateType: 'VkfInput',
        prop: 'roleId',
        maxlength: 10,
        label: '角色编号',
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.normal,
          },
        ],
      },
      {
        templateType: 'VkfInput',
        type: 'textarea',
        rows: 5,
        prop: 'memo',
        label: '角色简介',
        maxlength: 100,
      },
      {
        templateType: 'VkfButton',
        buttonLabel: '提交',
        type: 'primary',
        size: 'large',
        class: 'is-btn-group',
        onClick: () => {
          emit('submit', props.data as Row)
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
