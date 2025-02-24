<script lang="tsx" setup>
import type { __SkAppForm } from '@skzz/platform/components/app-form'
import type { SetDataEvent } from '@vunk/core'
import type { NormalObject } from '@vunk/shared'
import type { LoginQuery } from './api/types'
import { SkAppForm } from '@skzz/platform/components/app-form'

import { setData } from '@vunk/core'
import { getTenant, getToken } from '@vunk/skzz/shared/utils-auth'
import sha256 from 'crypto-js/sha256'
import { computed, ref, watchEffect } from 'vue'
import { login as loginByPassword, useLoginTenantMedia } from './api'
import CaptchaVue from './captcha.vue'

const emit = defineEmits({
  setData: (e: SetDataEvent) => e,
  login: (e: NormalObject) => e,
})
type FormItem = __SkAppForm.FormItem

/* --------------------- */

const { loginTenantOptions } = useLoginTenantMedia()

const formData = ref({
  userCode: 'slyy',
  password: 'Sl123456#',
} as LoginQuery)

function login () {
  const password = sha256(formData.value.password as string)
    .toString()

  return loginByPassword({
    ...formData.value,
    password,
  })
}

const defaultFormItemProps = {
  labelWidth: 0,
  size: 'large' as const,
  class: 'mb-28px',
}
const formItems = computed(() => [
  {
    templateType: 'VkfInput',
    ...defaultFormItemProps,
    prop: 'userCode',
    rules: {
      required: true,
      message: '请输入用户名',
    },
    placeholder: '请输入用户名',

  },
  {
    templateType: 'VkfInput',
    ...defaultFormItemProps,
    prop: 'password',
    rules: {
      required: true,
      message: '请输入密码',
    },
    showPassword: true,
    placeholder: '请输入密码',
  },

  {
    templateType: 'VkfSelect',
    prop: 'loginTenantId',
    size: 'large',
    class: 'select-w-full',
    placeholder: '请选择租户',
    rules: [
      {
        required: true,
        message: '请选择租户',
      },
    ],
    options: loginTenantOptions.value,
  },

  {
    templateType: 'Component',
    // will set captchaId and captcha
    is: () => (
      <CaptchaVue
        data={formData.value}
        prop="captcha"
        {
          ...defaultFormItemProps
        }
        onSetData={e => setData(formData.value, e)}
      >
      </CaptchaVue>
    ),
  },
  {
    templateType: 'VkfButton',
    buttonLabel: '登录',
    class: 'sub-btn-full pt-56px',
    type: 'primary',
    size: 'large',

    validate: true,
    onClick: () => {
      login()
      emit('login', formData.value)
    },
  },
] satisfies FormItem[])
</script>

<template>
  <SkAppForm
    :data="formData"
    :form-items="formItems"
    @set-data="setData(formData, $event)"
    @enter="login"
  >
  </SkAppForm>
</template>
