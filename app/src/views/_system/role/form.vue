<script lang="ts">
import { defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cuRole } from '@skzz-platform/api/system/role'
import { FirstParameter } from '@vunk/core'
import { PATTERN } from '@skzz-platform/shared/utils-form'
export type Data = FirstParameter<typeof cuRole>
  
export default defineComponent({
  components: {
    SkAppForm,
  },
  props: ['data'],
  emits: {
    submit: (data: Data) => data,
  },
  setup (props, { emit }) {
    const formItems: __SkAppForm.FormItem<keyof Data>[] = [
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
