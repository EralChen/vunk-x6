<script lang="ts" setup>
import ColorVue from './color/index.vue'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const themeStore = useThemeStore()

</script>
<template>
  <div pa-m>
    <ColorVue 
      :data="themeStore.globalStyles"
      @setData="setData(themeStore.globalStyles, $event)"
    ></ColorVue>

  </div>

</template>
