<script lang="ts">
import { useGraph, useGraphEmitter } from '@vunk-x16/composables'
import { defineComponent, onBeforeUnmount, onUnmounted, provide, watch, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkNode',
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    const { graphEmitterOn } = useGraphEmitter()
    const node = props.node ?? graph.createNode({
      id: props.id,
      shape: props.shape,
      label: props.label,
    })

    const handleAdded = () => {
      emit('update:orphan', false)
    }

    node.on('added', handleAdded)
    onBeforeUnmount(() => {
      node.off('added', handleAdded)
    })

    if (!props.orphan) {
      graph.addNode(node)
    }

    watchEffect(() => {
      node.prop('size', {
        width: props.width,
        height: props.height,
      })
    })

    watch(() => [
      props.x ?? node?.prop('position')?.x ?? 0,
      props.y ?? node?.prop('position')?.y ?? 0,
    ], ([x, y]) => {
      node.prop('position', {
        x,
        y,
      })
    }, {
      immediate: true,
    })

    emit('load', {
      graph,
      node,
    })
    provide('vk_node', node)

    graphEmitterOn('node:click', (event) => {
      if (event.node.id === node.id) {
        emit('click', {
          event,
          graph,
          node,
        })
      }
    })

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
