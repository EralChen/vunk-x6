<script lang="ts">
import { defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cuRole } from '@skzz-platform/api/system/role'
import { FirstParameter } from '@vunk/core'
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
      },
      {
        templateType: 'VkfInput',
        prop: 'roleId',
        label: '角色编号',
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
