<script lang="ts">
import { defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz/platform/components/app-form'
import { cuRole } from '@skzz/platform/api/system/role'
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
    :formItems="formItems"
  ></SkAppForm>
</template>
