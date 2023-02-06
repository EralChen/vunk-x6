<template>
  <router-view></router-view>
</template>
<script>
import { useElementPlusTheme } from '@/styles'
export default {
  name: 'App',
  mounted () {
    useElementPlusTheme()
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
