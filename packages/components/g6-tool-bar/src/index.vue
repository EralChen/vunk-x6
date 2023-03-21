<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, onBeforeUnmount, onMounted, Ref, shallowRef } from 'vue'
import { ToolBar } from '@antv/g6-plugin'
import { useGraph } from '@skzz-platform/composables/use-graph'
export default defineComponent({
  name: 'SkG6ToolBar',
  emits,
  props,
  setup (props, { emit }) {
    const toolBarNode = shallowRef() as Ref<HTMLDivElement>
    const ready = shallowRef(false)
    const graph = useGraph()

    onMounted(() => {
      const toolBar = new ToolBar({
        container: toolBarNode.value,
        ...props.defaultOptions,
      })
      graph.addPlugin(toolBar)
      ready.value = true

      emit('load', {
        toolBar,
        graph,
      })

      onBeforeUnmount(() => {
        graph.removePlugin(toolBar)
      })
      
    })
    return {
      ready,
      toolBarNode,
    }
  },
})
</script>
<template>
  <div ref="toolBarNode" class="sk-g6-tool-bar">
    <slot v-if="ready"></slot>
  </div>
</template>
<style>
.sk-g6-tool-bar{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  inset: var(--gap-page, 14px);
  pointer-events: none;
}
.sk-g6-tool-bar > * {
  pointer-events: initial;
}
.sk-g6-tool-bar .g6-component-toolbar {
  left: initial;
  right: 0;
}
</style>