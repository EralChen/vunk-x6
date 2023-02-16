<script lang="ts">
import { defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cRole } from '@skzz-platform/api/system/role'
import { FirstParameter } from '@vunk/core'
type Data = FirstParameter<typeof cRole>
  
export default defineComponent({
  components: {
    SkAppForm,
  },
  setup () {
    const formItems: __SkAppForm.FormItem<keyof Data>[] = [
      {
        templateType: 'VkfInput',
        prop: 'name',
        label: '姓名',
      },
      {
        templateType: 'VkfButton',
        buttonLabel: '提交',
        
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
    :formItems="formItems"
  ></SkAppForm>
</template>
