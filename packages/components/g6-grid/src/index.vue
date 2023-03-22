<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, onMounted, onUnmounted, Ref, shallowRef } from 'vue'
import { Grid } from '@antv/g6-plugin'
import { useGraph } from '@skzz-platform/composables/use-graph'
export default defineComponent({
  name: 'SkG6Grid',
  emits,
  props,
  setup (props, { emit }) {
    const gridNode = shallowRef() as Ref<HTMLDivElement>
    const ready = shallowRef(false)
    const graph = useGraph()
    onMounted(() => {
      const grid = new Grid({
        ...props.defaultOptions,
      })
      graph.addPlugin(grid)

      ready.value = true

      emit('load', {
        grid,
        graph,
      })

      onUnmounted(() => {
        graph.removePlugin(grid)
      })

    })
    return {
      gridNode,
      ready,
    }
  },
})
</script>
<template>
  <slot v-if="ready"></slot>
</template>
<style>
.g6-grid-container{
  z-index: 0!important;
  pointer-events: none;
}
.sk-g6-graph canvas{
  position: absolute;
  z-index: 1;
}
</style>