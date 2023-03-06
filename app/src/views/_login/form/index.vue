<script lang="tsx" setup>
import { SetDataEvent } from '@vunk/core'
import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { PropType } from 'vue'
import { LoginFormData } from '../types'
import CaptchaVue from './captcha.vue'

const props = defineProps({
  data: {
    type: Object as PropType<LoginFormData>,
    default: () => ({}),
  },
})
const emit = defineEmits({
  setData: (e: SetDataEvent<keyof LoginFormData>) => e,
  login: (e: LoginFormData) => e,
})
/* --------------------- */

const labelWidth = '0'
const formItems: FormItemRendererSource<keyof LoginFormData>[] = [
  {
    templateType: 'VkfInput',
    // label: '用户名',
    labelWidth,
    prop: 'userCode',
    size: 'large',
    rules: {
      required: true,
      message: '请输入用户名',
    },
  },
  {
    templateType: 'VkfInput',
    // label: '密码',
    size: 'large',
    labelWidth,
    prop: 'password',
    rules: {
      required: true,
      message: '请输入密码',
    },
  },
  {
    templateType: 'Component',
    // will set captchaId and captcha
    is: () => <CaptchaVue
      data={props.data}
      labelWidth={labelWidth}
      prop="captcha"
      size="large"
      onSetData={e => emit('setData', e)}
    ></CaptchaVue>,
  },
  {
    templateType: 'VkfButton',
    buttonLabel: '登录',
    class: 'sub-btn-full pt-56px',
    type: 'primary',
    size: 'large',
    
    validate: true,
    onClick: () => {
      emit('login', props.data)
    },
  },
]

</script>
<template>
  <VkfForm 
    :data="data"
    :formItems="formItems"
    @setData="$emit('setData', $event)"
  >
  </VkfForm>
</template>
