<script lang="tsx">
import { Graph } from '@antv/x6'
import { getTeleport, register } from '@antv/x6-vue-shape'
import { useResizeObserver } from '@vueuse/core'
import { defineComponent, onUnmounted, ref, shallowRef } from 'vue'
import { emits, props } from './ctx'

const TeleportContainer = getTeleport()

export default defineComponent({
  name: 'VkNodeComponent',
  components: {
    TeleportContainer,
  },
  props,
  emits,
  setup (props, { slots }) {
    register({
      shape: props.shape,
      component: {
        props: {
          node: null,
          graph: null,
        },
        setup (nodeProps) {
          const data = shallowRef(nodeProps.node.getData())

          nodeProps.node.on('change:data', () => {
            data.value = nodeProps.node.getData()
          })

          const renderSlot = () => {
            return slots.default?.({
              node: nodeProps.node,
              attrs: nodeProps.node.attrs,
              graph: nodeProps.graph,
              data: data.value,
            })
          }

          if (!props.autoSize) {
            return renderSlot
          }
          const containerRef = ref<HTMLElement>()
          const setContainerRef = e => containerRef.value = e
          useResizeObserver(containerRef, (entries) => {
            const { width, height } = entries[0].contentRect
            nodeProps.node.size({
              width,
              height,
            })
          })

          return () => (
            <div
              ref={setContainerRef}
              class={
                `vk-node-component-size-container ${
                  props.autoSizeContainerClass}`
              }
            >
              { renderSlot() }
            </div>
          )
        },
      },
      ports: {
        groups: props.groups,
      },

    })

    onUnmounted(() => {
      Graph.unregisterNode(props.shape)
    })

    return {}
  },
})
</script>

<template>
  <TeleportContainer></TeleportContainer>
</template>

<style>
.vk-node-component-size-container{
  width: max-content;
}
</style>
