<script lang="ts" setup>
import FormVue from '../MenuForm.vue'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const themeStore = useThemeStore()

</script>
<template>
  <div class="pa-page">
    <FormVue 
      :data="themeStore.headerMenuStyles"
      @setData="setData(themeStore.headerMenuStyles, $event)"
    ></FormVue>
  </div>
</template>
