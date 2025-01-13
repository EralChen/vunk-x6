<script lang="ts">
import { useGraph } from '@vunk-x6/composables'
import { defineComponent, onUnmounted, provide, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkNode',
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    const node = graph.addNode({
      id: props.id,
      shape: props.shape,
      label: 'Node',

    })

    watchEffect(() => {
      node.prop('size', {
        width: props.width,
        height: props.height,
      })
    })

    watchEffect(() => {
      node.prop('position', {
        x: props.x,
        y: props.y,
      })
    })

    emit('load', {
      graph,
      node,
    })
    provide('vk_node', node)

    onUnmounted(() => {
      graph.removeNode(node)
    })

    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
