<script lang="ts">
import { useModelComputed } from '@vunk/core/composables'
import { useGraph, useGraphEmitter } from '@vunk-x6/composables'
import { defineComponent, onBeforeUnmount, onUnmounted, provide, watch, watchEffect } from 'vue'
import { emits, props } from './ctx'

// 创建一个 Symbol 作为 zIndex 计数器的 key
const Z_INDEX_COUNTER = Symbol('z-index-counter')

export default defineComponent({
  name: 'VkNode',
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    if (!graph[Z_INDEX_COUNTER]) {
      graph[Z_INDEX_COUNTER] = 1
    }

    const theData = useModelComputed({
      default: {},
      key: 'data',
    }, props, emit)

    const { graphEmitterOn } = useGraphEmitter()
    const node = graph.createNode({
      id: props.id,
      shape: props.shape,
      label: props.label,
      zIndex: graph[Z_INDEX_COUNTER]++,
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

    watchEffect(() => {
      node.setData(theData.value, {
        overwrite: true,
      })
    })

    const syncData = () => {
      theData.value = node.getData()
    }
    node.on('change:data', syncData)
    onBeforeUnmount(() => {
      node.off('change:data', syncData)
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

    graphEmitterOn('node:click', (event) => {
      if (event.node.id === node.id) {
        emit('click', {
          event,
          graph,
          node,
        })
      }
    })

    graphEmitterOn('node:mousedown', (event) => {
      // 点击时将节点提升到最上层
      if (event.node.id === node.id) {
        if ((node.getZIndex() ?? 0) < graph[Z_INDEX_COUNTER]) {
          node.setZIndex(graph[Z_INDEX_COUNTER]++)
        }
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
