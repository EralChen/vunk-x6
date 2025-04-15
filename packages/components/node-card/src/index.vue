<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import { VkNodeHeader } from '@vunk-x6/components/node-header'
import { useGraph, useGraphEmitter, useMousewheelGuardClass } from '@vunk-x6/composables'
import { SymbolNodeMovable } from '@vunk-x6/shared'
import { ElCard } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { props as dProps } from './ctx'

defineOptions({
  name: 'VkNodeCard',
  inheritAttrs: false,
})

const props = defineProps(dProps)
const { graphEmitterOn } = useGraphEmitter()
const graph = useGraph()

const nodeData = cloneDeep(props.defaultData)
const drawerVisible = ref(false)

/* 阻止 click */
graphEmitterOn('node:mouseup', ({ e }) => {
  const path = e.originalEvent.composedPath()
  for (const item of path) {
    if (
      item instanceof HTMLElement
    ) {
      for (const className of props.stopClickClass) {
        if (item.classList.contains(className)) {
          e.stopPropagation()
          return
        }
      }
    }
  }
})
/* 阻止 click  END */

/* 阻止 drag */
const currentPannable = graph.panning.pannable
let currentHandleNode: Node | null = null
graphEmitterOn('node:mousedown', (event) => {
  const { e, node } = event
  const path = e.originalEvent.composedPath()
  for (const item of path) {
    if (
      item instanceof HTMLElement
    ) {
      for (const className of props.stopMoveClass) {
        if (item.classList.contains(className)) {
          node[SymbolNodeMovable] = false
          currentHandleNode = node
          graph.togglePanning(false)
          return
        }
      }
    }
  }
})
onMounted(() => {
  document.addEventListener('mouseup', unHandleNodeMousedown)
})
onBeforeUnmount(() => {
  document.removeEventListener('mouseup', unHandleNodeMousedown)
})
function unHandleNodeMousedown () {
  if (currentHandleNode) {
    currentHandleNode[SymbolNodeMovable] = true
    currentHandleNode = null
  }
  graph.togglePanning(currentPannable)
}
/* 阻止 drag END */

/* 阻止 zoom */
const { addMousewheelGuardClass } = useMousewheelGuardClass()
for (const className of props.stopZoomClass) {
  addMousewheelGuardClass(className)
}
/* 阻止 zoom END */
</script>

<template>
  <VkNodeComponent
    :shape="shape"
    :auto-size="true"
    :items="ports"
    :default-instance-data="nodeData"
  >
    <template #default="args">
      <ElCard
        class="vk-node-card"
        shadow="hover"
        v-bind="$attrs"
      >
        <template #header>
          <VkNodeHeader
            v-model:title="args.data.label"
            :node="args.node"
          >
            <template #icon>
              <slot name="icon"></slot>
            </template>
          </VkNodeHeader>
        </template>

        <slot v-bind="args"></slot>
      </ElCard>
    </template>
  </VkNodeComponent>

  <VkNodeDrawer
    v-model="drawerVisible"
    class="vk-node-card-drawer"
    :shape="shape"
    :description="description"
  >
    <template #header_icon>
      <slot name="icon"></slot>
    </template>

    <template #default="args">
      <slot name="drawer" v-bind="args"></slot>
    </template>
  </VkNodeDrawer>
</template>

<style>
.vk-node-card {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-node-card {
  min-width: 380px;
}

.vk-node-card-drawer  .vk-node-header__title {
  font-size: 1.2em;
}
</style>
