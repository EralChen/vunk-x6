<script lang="ts" setup>
import { onMounted } from 'vue'
/* maybe from env */
const VITE_DING_BASE = 'https://login.dg-work.cn/oauth2/auth.htm'
const VITE_DING_REDIRECT_URI = 'http://183.249.87.107:10000'
const VITE_DING_CLIENT_ID = 'scene_building_dingoa'

const clientId = VITE_DING_CLIENT_ID
const redirectUri = VITE_DING_REDIRECT_URI
const dingBase = VITE_DING_BASE
const url = `${dingBase}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=get_user_info&authType=QRCODE&embedMode=true`

onMounted(() => {
  window.addEventListener('message', (event) => {
    // 授权码
    const code = event.data.code
    // eslint-disable-next-line no-console
    console.log(code)
  })
})
</script>

<template>
  <div sk-flex="row-center">
    <iframe
      :src="url"
      frameborder="0"
      height="350px"
      width="350px"
    />
  </div>
</template>
