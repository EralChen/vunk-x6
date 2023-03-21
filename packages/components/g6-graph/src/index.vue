<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, onBeforeMount, onMounted, provide, Ref, shallowRef } from 'vue'
import { Graph } from '@antv/g6'
import { debounce } from 'lodash-es'
export default defineComponent({
  name: 'SkG6Graph',
  emits,
  props,
  setup (props, { emit }) {
    const ready = shallowRef(false)
    const graph = shallowRef() as Ref<Graph>
    const g6Node = shallowRef() as Ref<HTMLElement>
    onMounted(() => {

      graph.value = new Graph({
        container: g6Node.value,
        ...props.defaultOptions,
      })
      ready.value = true
      provide('skG6Graph', graph.value)

      emit('load', {
        graph: graph.value,
      })



      /* resize */
      const dOb = debounce((entries) => {
        graph.value.changeSize(entries[0].contentRect.width, entries[0].contentRect.height)
      }, 100)
      const observer = new ResizeObserver(dOb)
      observer.observe(g6Node.value)
      onBeforeMount(() => {
        observer.unobserve(g6Node.value)
      })
      /* resize end */

    })
    return {
      g6Node,
      graph,
      ready,
    }
  },
})
</script>
<template>
  <div ref="g6Node" class="sk-g6-graph">
    <slot v-if="ready"></slot>
  </div>
</template>
<style>
.sk-g6-graph{
  background-color: var(--el-bg-color);
  height: 100%;
  position: relative;
}
</style>