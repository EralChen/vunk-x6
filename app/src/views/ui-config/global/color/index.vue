<script lang="ts" setup>
import CoreVue from './core.vue'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const themeStore = useThemeStore()

</script>
<template>
  <div pa-m>
    <CoreVue 
      :data="themeStore.globalStyles"
      @setData="setData(themeStore.globalStyles, $event)"
      :labelWidth="150"
    ></CoreVue>

  </div>

</template>
