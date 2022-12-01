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

const labelWidth = '5em'
const formItems: FormItemRendererSource<keyof LoginFormData>[] = [
  {
    templateType: 'VkfInput',
    label: '用户名',
    labelWidth,
    prop: 'userCode',
    rules: {
      required: true,
      message: '请输入用户名',
    },
  },
  {
    templateType: 'VkfInput',
    label: '密码',
    labelWidth,
    prop: 'password',
    rules: {
      required: true,
      message: '请输入密码',
    },
  },
  {
    templateType: 'Component',
    is: () => <CaptchaVue
      data={props.data}
      labelWidth={labelWidth}
      label="验证码"
      prop="captcha"
      onSetData={e => emit('setData', e)}
    ></CaptchaVue>,
  },
  {
    templateType: 'VkfButton',
    buttonLabel: '登录',
    class: 'login-form-vkbtn',
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
<style>
.login-form-vkbtn > .el-form-item__content{
  display: flex;
  justify-content: flex-end;
}
</style>
