<script lang="ts" setup>
import type { GraphEmitter } from './types'
import { useGraph } from '@vunk-x16/composables'
import mitt from 'mitt'
import { provide } from 'vue'

const graph = useGraph()
const emitter = mitt() as GraphEmitter

graph.on('node:click', (args) => {
  emitter.emit('node:click', args)
})
graph.on('node:move', (args) => {
  emitter.emit('node:move', args)
})
graph.on('node:mouseup', (args) => {
  emitter.emit('node:mouseup', args)
})
graph.on('node:mousemove', (args) => {
  emitter.emit('node:mousemove', args)
})
graph.on('node:mousedown', (args) => {
  emitter.emit('node:mousedown', args)
})
graph.on('selection:changed', (args) => {
  emitter.emit('selection:changed', args)
})
graph.on('blank:click', (args) => {
  emitter.emit('blank:click', args)
})

provide('vk_graph_emitter', emitter)
</script>

<template>
  <slot></slot>
</template>
