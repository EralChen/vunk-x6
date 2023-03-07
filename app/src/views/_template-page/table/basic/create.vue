<script lang="ts" setup>
import { useRouteActive } from '@skzz-platform/composables'
const routeActive = useRouteActive('create')
</script>
<template>
  <ElDialog v-model="routeActive">
    
  </ElDialog>
</template>
