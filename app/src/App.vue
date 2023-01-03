<template>
  <router-view></router-view>
</template>
<script>
import { useThemeStore } from '@/stores/theme'
export default {
  name: 'App',
  mounted () {
    useThemeStore()
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
