<script lang="ts">
import type { Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { getTeleport, register } from '@antv/x6-vue-shape'
import { defineComponent, inject, onUnmounted } from 'vue'
import { emits, props } from './ctx'

const TeleportContainer = getTeleport()

export default defineComponent({
  name: 'VkNodeComponent',
  components: {
    TeleportContainer,
  },
  props,
  emits,
  setup (props, { emit, slots }) {
    register({
      shape: props.shape,

      component: {
        props: {
          node: null,
          graph: null,
        },
        setup (props) {
          return () => slots.default?.({
            node: props.node,
            graph: props.graph,
          })
        },
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
