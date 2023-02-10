<template>
  <router-view></router-view>
</template>
<script>
import { useInitTheme } from '@skzz-platform/composables'
export default {
  name: 'App',
  mounted () {
    useInitTheme()

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
