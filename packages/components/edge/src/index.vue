<script lang="ts">
import { useGraph } from '@vunk-x6/composables'
import { defineComponent, onBeforeUnmount, provide, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkEdge',
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()

    const edge = graph.addEdge({
      id: props.id,
    })

    watchEffect(() => {
      edge.prop('source', props.source)
    })

    watchEffect(() => {
      edge.prop('target', props.target)
    })

    provide('vk_edge', edge)

    emit('load', {
      graph,
      edge,
    })

    onBeforeUnmount(() => {
      edge.remove()
    })

    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
