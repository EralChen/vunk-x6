<script lang="ts" setup>
import { VaMapView, VaTdtBasemap } from '@vuesri/core'
import { useSharedDark } from '@skzz-platform/composables'
import { VaZoom } from '@vuesri/core/components/zoom'

const isDark = useSharedDark()
</script>
<template>
  <VaMapView>
    <VaTdtBasemap :type="isDark ? 'img_c' : 'vec_c'" />
    <VaZoom :position="'top-trailing'"></VaZoom>
    <slot></slot>
  </VaMapView>
</template>
