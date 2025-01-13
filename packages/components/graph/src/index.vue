<script lang="ts">
import { Graph } from '@antv/x6'
import { defineComponent, onMounted, provide, ref, shallowRef } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkGraph',
  inheritAttrs: false,
  props,
  emits,
  setup (props, { emit }) {
    const graphMainNode = ref<HTMLElement>()
    const ready = ref(false)
    const graph = shallowRef<Graph>()

    onMounted(() => {
      graph.value = new Graph({
        container: graphMainNode.value,
        grid: true,
        autoResize: true,
        panning: true,
        mousewheel: {
          enabled: true,
          modifiers: [],
        },
        ...props.defaultOptions,
      })
      provide('vk_graph', graph.value)

      emit('load', {
        graph: graph.value,
      })

      ready.value = true
    })

    return {
      ready,
      graphMainNode,
    }
  },
})
</script>

<template>
  <div class="vk-graph">
    <div
      v-bind="$attrs"
      ref="graphMainNode"
    ></div>
    <slot v-if="ready"></slot>
  </div>
</template>

<style>
.vk-graph {
  width: 100%;
  height: 100%;
}
</style>
