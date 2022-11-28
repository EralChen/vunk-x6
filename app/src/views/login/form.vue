<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'
const formItems: FormItemRendererSource[] = [
  {
    templateType: 'VkfInput',
    prop: 'username',
  },
  {
    templateType: 'VkfInput',
    prop: 'password',
  },
]
</script>
<template>
  <VkfForm :formItems="formItems"></VkfForm>
</template>
