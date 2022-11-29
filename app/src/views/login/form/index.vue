<script lang="tsx" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'
import CaptchaVue from './captcha.vue'
const formItems: FormItemRendererSource[] = [
  {
    templateType: 'VkfInput',
    label: '用户名',
    labelWidth: '4em',
    prop: 'username',
  },
  {
    templateType: 'VkfInput',
    label: '密码',
    labelWidth: '4em',
    prop: 'password',
  },
  {
    templateType: 'Component',
    is: () => <CaptchaVue></CaptchaVue>,
  },
]
</script>
<template>
  <VkfForm :formItems="formItems">
  </VkfForm>
</template>
