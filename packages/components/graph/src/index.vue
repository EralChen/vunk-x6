<script lang="ts">
import { Graph } from '@antv/x6'
import { getTeleport } from '@antv/x6-vue-shape'
import { computed, defineComponent, onMounted, provide, ref, shallowRef } from 'vue'
import { defaultConnecting, defaultHighlighting, defaultInteracting } from './const'
import { emits, props } from './ctx'
import Emitter from './emitter.vue'
import { initMousewheelGuardClass } from './use'

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

    const { getMousewheelGuardClass } = initMousewheelGuardClass()

    onMounted(() => {
      graph.value = new Graph({
        container: graphMainNode.value,
        grid: true,
        autoResize: true,
        panning: true,
        mousewheel: {
          enabled: true,
          guard (e) {
            const path = e.composedPath()
            for (const item of path) {
              if (item instanceof HTMLElement) {
                for (const className of getMousewheelGuardClass()) {
                  if (item.classList.contains(className)) {
                    return false
                  }
                }
              }
            }
            return true
          },
          modifiers: [],
        },
        connecting: defaultConnecting,
        highlighting: defaultHighlighting,
        interacting: defaultInteracting,
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
  <slot v-if="ready" name="before"></slot>

  <div class="vk-graph" v-bind="$attrs">
    <div
      v-bind="$attrs"
      ref="graphMainNode"
    ></div>

    <Emitter v-if="ready">
      <TeleportContainer
        v-if="hasTeleport"
      ></TeleportContainer>

      <slot></slot>
    </Emitter>
  </div>
  <slot v-if="ready" name="after"></slot>
</template>

<style>
.vk-graph {
  width: 100%;
  height: 100%;
  position: relative;
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

.vk-graph  .x6-widget-selection-box {
  border: none;
  display: none;
}

.vk-graph .x6-widget-selection-inner {
  border:none;
}
</style>
