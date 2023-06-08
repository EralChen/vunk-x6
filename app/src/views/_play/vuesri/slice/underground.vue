<script lang="ts" setup>
import { useSceneView } from '@vuesri/core/composables'
import { VaViewUi } from '@vuesri/core'
import { ref, watchEffect } from 'vue'
const view = useSceneView()
const map = view.map
map.ground.navigationConstraint = {
  type: 'none',
}
const opacity = ref(0.6)

watchEffect(() => {
  map.ground.opacity = opacity.value
})


map.ground.surfaceColor = '#CFC7BC' as unknown as __esri.Color


</script>
<template>
  <VaViewUi
    :position="'top-leading'"
    :class="'w-80 bg-bg-overlay'"
  >
    <ElFormItem
      :label="'地面透明度'"
      class="pa-2"
    >
      <ElSlider
        v-model="opacity"
        :step="0.01"
        :max="1"
        :min="0"
      ></ElSlider>
    </ElFormItem>
  </VaViewUi>
  <slot></slot>
</template>
