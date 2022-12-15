<script lang="ts" setup>
import FormVue from './form.vue'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const themeStore = useThemeStore()

</script>
<template>
  <FormVue 
    pa-m
    :data="themeStore.menuStyles"
    @setData="setData(themeStore.menuStyles, $event)"
  ></FormVue>
</template>
