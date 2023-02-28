<script lang="ts" setup>
import { VaMapView, VaTdtBasemap } from '@vuesri/core'
import { useSharedDark } from '@skzz-platform/composables'
import { VaZoom } from '@vuesri/core/components/zoom'
import { props as dProps } from './ctx'
defineProps({
  ...dProps,
})

const isDark = useSharedDark()
</script>
<template>
  <VaMapView :defaultOptions="defaultOptions">
    <VaTdtBasemap :type="isDark ? 'img_c' : 'vec_c'" />
    <VaZoom :position="'top-leading'"></VaZoom>
    <slot></slot>
  </VaMapView>
</template>
