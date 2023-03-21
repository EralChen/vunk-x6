<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, onBeforeUnmount, onMounted, Ref, ref } from 'vue'
import { Minimap } from '@antv/g6'
import { useGraph } from '@skzz-platform/composables/use-graph'

export default defineComponent({
  name: 'SkG6Minimap',
  emits,
  props,
  setup (props, { emit }) {
    const ready = ref(false)
    const minimapNode = ref() as Ref<HTMLDivElement>
    const graph = useGraph()

    onMounted(() => {
      const minimap = new Minimap({
        container: minimapNode.value,
        graph,
        ...props.defaultOptions,
      })
      graph.addPlugin(minimap)
      ready.value = true
      emit('load', {
        graph, minimap,
      })

      onBeforeUnmount(() => {
        graph.removePlugin(minimap)
      })
      
    })

    return {
      ready,
      minimapNode,
    }
  },
})
</script>
<template>
  <div ref="minimapNode" class="sk-g6-minimap">
    <slot v-if="ready"></slot>
  </div>
</template>
<style>
.sk-g6-minimap{
  position: absolute;
  bottom: var(--gap-page, 14px);
  left: var(--gap-page, 14px);
  border: var(--el-border);
  border-radius: var(--el-border-radius-base);
}
</style>