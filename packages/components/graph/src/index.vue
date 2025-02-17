<script lang="ts">
import { Graph } from '@antv/x6'
import { getTeleport } from '@antv/x6-vue-shape'
import { computed, defineComponent, onMounted, provide, ref, shallowRef } from 'vue'
import { defaultConnecting, defaultHighlighting } from './const'
import { emits, props } from './ctx'
import Emitter from './emitter.vue'

const TeleportContainer = getTeleport()

export default defineComponent({
  name: 'VkGraph',
  components: {
    Emitter,
    TeleportContainer,
  },
  inheritAttrs: false,
  props,
  emits,
  setup (props, { emit }) {
    const graphMainNode = ref<HTMLElement>()
    const ready = ref(false)
    const graph = shallowRef<Graph>()
    const hasTeleport = computed(() => {
      return props.modules.includes('vue_shape_teleport')
    })

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
        connecting: defaultConnecting,
        highlighting: defaultHighlighting,
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
      hasTeleport,
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
    <Emitter v-if="ready">
      <slot></slot>
    </Emitter>

    <TeleportContainer
      v-if="hasTeleport"
    ></TeleportContainer>
  </div>
</template>

<style>
.vk-graph {
  width: 100%;
  height: 100%;
}

.vk-graph .x6-node [magnet-rule='passive'] {
  cursor: default;
}
.vk-graph .x6-graph-svg {
  z-index: 2;
}
.vk-graph .x6-widget-selection {
  z-index: 1;
}
</style>
