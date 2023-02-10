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
  <div class="login-page">
    <FormVue 
      class="login-form"
      :data="data"
      @setData="setData(data, $event)"
      @login="login"
    ></FormVue>
  </div>
</template>

<style>
.login-form{
  position: absolute;
  height: min-content;
  width: 50vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 10em;
  margin: auto;
}
.login-page{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

<!-- <style>
.el-form-item {
  position: relative;
}
.el-form-item label{
  position: absolute;
  top: -24px;
  left: 0;
  font-size: 12px;
  transition: .5s;
}
</style> -->
