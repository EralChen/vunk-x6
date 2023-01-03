<script lang="ts" setup>
import CoreVue from './core.vue'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const themeStore = useThemeStore()

</script>
<template>
  <div pa-xxl>
    <CoreVue 
      :data="themeStore.colorStyles"
      @setData="setData(themeStore.colorStyles, $event)"
      :labelWidth="150"
    ></CoreVue>

  </div>

</template>
