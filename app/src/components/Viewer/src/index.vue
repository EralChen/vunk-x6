<script lang="ts" setup>
import { VaMapView, VaTdtBasemap, VaBasemapToggle } from '@vuesri/core'
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
    <VaTdtBasemap :type="'img_c'" :thumbnailUrl="'http://lbs.tianditu.gov.cn/images/img_c.png'" />
    <VaZoom :position="'bottom-trailing'"></VaZoom>

    <VaBasemapToggle :position="'bottom-leading'">
      <VaTdtBasemap :type="'vec_c'" />
    </VaBasemapToggle>
    <slot></slot>
  </VaMapView>
</template>
