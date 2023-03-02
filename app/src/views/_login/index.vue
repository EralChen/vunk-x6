<script lang="ts" setup>
import FormVue from './form/index.vue'
import { setData } from '@vunk/core'
import { ref } from 'vue'
import { LoginFormData } from './types'
import { loginByPassword } from '@skzz-platform/api/login'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = ref({
  userCode: 'root',
  password: '123456',
} as LoginFormData)
const login = () => {
  loginByPassword(data.value).then(() => {
    router.push({ path: '/home' })
  })
}
</script>
<template>
  <div sk-flex="col-center2" class="h-100% bg-bg-page">
    <div class="w-1200px h-680px bg-bg-overlay rd-16px">
      <FormVue 
      class="login-form"
      :data="data"
      @setData="setData(data, $event)"
      @login="login"
    ></FormVue>
    </div>
  </div>
</template>
