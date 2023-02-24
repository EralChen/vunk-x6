<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script>
import { useInitTheme, useArcgisTheme } from '@skzz-platform/composables'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default {
  name: 'App',
  data () {
    return {
      zhCn,
    }
  },
  mounted () {
    useInitTheme()
    useArcgisTheme(import.meta.env.VITE_BASE_URL + '/Esri')

  },
}
</script>
<style>
html{
  height: 100%;
}
body, #app {
  height: inherit;
}
</style>
