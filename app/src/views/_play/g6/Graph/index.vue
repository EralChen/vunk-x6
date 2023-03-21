<template>
  <div
    class="g6-x"
    ref="g6Node"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Graph } from '@antv/g6'
import { debounce } from 'lodash-es'
import { onBeforeMount, onMounted, provide, ref, shallowRef } from 'vue'
import { graphSymbol } from '../ctx'
import { propsOpts } from './ctx'

const emit = defineEmits<{
  (e: 'load', graph: Graph): void
}>()
const props = defineProps(propsOpts)
const g6Node = ref<HTMLElement>()
let graph = shallowRef<Graph>()
let observer: ResizeObserver

provide(graphSymbol, graph)

function init () {
  if (g6Node.value) {
    graph.value = new Graph({
      container: g6Node.value,
      ...props.ops,
    })
    emit('load', graph.value)
    if (props.data) {
      graph.value.data(props.data)
      graph.value.render()
    }
  }
}

const dOb = debounce((entries) => {
  graph.value?.changeSize(entries[0].contentRect.width, entries[0].contentRect.height)
}, 100)

onMounted(() => {
  // 最优雅的方式，但是兼容性不好
  if (g6Node.value) {
    observer = new ResizeObserver(dOb)
    observer.observe(g6Node.value)
    init()
  }

})

onBeforeMount(() => {
  if (g6Node.value)
    observer?.unobserve(g6Node.value)
})
</script>

<style scoped>
.g6-x{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>