<script lang="ts" setup>
import FormVue from './form.vue'
import { useLayoutStore } from '@/stores/layout'
import { setData } from '@vunk/core'
const layoutStore = useLayoutStore()

</script>
<template>
  <FormVue 
    :data="layoutStore.menuStyles"
    @setData="setData(layoutStore.menuStyles, $event)"
  ></FormVue>
</template>
