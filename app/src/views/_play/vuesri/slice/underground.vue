<script lang="ts" setup>
import { useSceneView } from '@vuesri/core/composables'
const view = useSceneView()
const map = view.map
map.ground.navigationConstraint = {
  type: 'none',
}
map.ground.opacity = 0.5

map.ground.surfaceColor = '#CFC7BC' as unknown as __esri.Color


</script>
<template>
  <slot></slot>
</template>
