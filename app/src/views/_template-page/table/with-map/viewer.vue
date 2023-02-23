<script lang="ts" setup>
import { VaMapView, VaTdtBasemap } from '@vuesri/core'
import { useSharedDark } from '@skzz-platform/composables'
const isDark = useSharedDark()
</script>
<template>
  <VaMapView>
    <VaTdtBasemap :type="isDark ? 'img_c' : 'vec_c'" />
    <slot></slot>
  </VaMapView>
</template>
