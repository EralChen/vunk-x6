<script lang="ts">
import { _VathEntityLayerEventsCtx, VathEntityLayerEvents } from '@vuesri/three/components/entity-layer-events'
import { _VathLayerUse } from '@vuesri/three/components/layer'
import { useThreeRenderer } from '@vuesri/three/composables'
import { defineComponent, provide, watch } from 'vue'
import { ArcLayer } from './core'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VathArcLayer',
  components: {
    VathEntityLayerEvents,
  },
  props,
  emits,
  setup (props, { emit }) {
    const renderer = useThreeRenderer()
    const eventsEmits = _VathEntityLayerEventsCtx.createOnEmits(emit)

    const layer = new ArcLayer({
      source: props.source,
    })
    watch(() => props.source, (source) => {
      layer.source = source
    })
    _VathLayerUse.useAddLayer(renderer, layer)

    emit('load', {
      layer,
      renderer,
      view: renderer.view,
    })
    provide('vathEntityLayer', layer)

    return {
      eventsEmits,
    }
  },
})
</script>

<template>
  <VathEntityLayerEvents
    v-on="eventsEmits"
  ></VathEntityLayerEvents>
  <slot></slot>
</template>
