<script lang="ts">
import type { Cell } from '@antv/x6'
import { useModelComputed } from '@vunk/core/composables'
import { useGraph } from '@vunk-x6/composables'
import { ElDrawer } from 'element-plus'
import { computed, defineComponent, onBeforeUnmount, shallowRef } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkNodeDrawer',
  components: {
    ElDrawer,
  },
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    const appendTo = graph.container.parentElement as HTMLDivElement

    const modelValue = useModelComputed({
      key: 'modelValue',
      default: false,
    }, props, emit)

    const currentNode = shallowRef<Cell>()
    const nodeData = shallowRef<any>({})

    // Store data change handler for cleanup
    const onDataChanged = () => {
      if (currentNode.value) {
        nodeData.value = currentNode.value.getData()
      }
    }

    // Clean up current node listeners
    function cleanupCurrentNode () {
      if (currentNode.value) {
        currentNode.value.off('change:data', onDataChanged)
      }
    }

    function onSelectionChanged () {
      const selectedCells = graph.getSelectedCells()
      const last = selectedCells.at(-1)

      // Update model value based on shape
      modelValue.value = last?.shape === props.shape

      // Clean up previous listeners
      cleanupCurrentNode()

      // Track current node and update data
      if (last?.shape === props.shape && last) {
        currentNode.value = last
        nodeData.value = last.getData()
        // Listen for data changes
        last.on('change:data', onDataChanged)
      }
      else {
        currentNode.value = undefined
        nodeData.value = {}
      }
    }

    // Computed slot args with reactive data
    const slotArgs = computed(() => ({
      node: currentNode.value ?? {},
      attrs: currentNode.value?.attrs ?? {},
      graph,
      data: nodeData.value,
    }))

    graph.on('selection:changed', onSelectionChanged)
    graph.on('node:click', onSelectionChanged)

    // Cleanup event listeners on unmount
    onBeforeUnmount(() => {
      cleanupCurrentNode()
      graph.off('selection:changed', onSelectionChanged)
      graph.off('node:click', onSelectionChanged)
    })

    return {
      modelValue,
      appendTo,
      slotArgs,
    }
  },
})
</script>

<template>
  <ElDrawer
    v-model="modelValue"
    :append-to="appendTo"
    class="vk-node-drawer"
    modal-class="vk-node-drawer__modal"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :size="size"
  >
    <template #header>
      <slot name="header" v-bind="slotArgs" />
    </template>
    <slot v-bind="slotArgs" />
  </ElDrawer>
</template>

<style>
.vk-node-drawer__modal {
  position: absolute;
  background-color: transparent;
  pointer-events: none;
}

.vk-node-drawer__modal .el-drawer__header {
  margin-bottom: 10px;
}

.vk-node-drawer__modal .el-drawer {
  --el-drawer-padding-primary: 10px;
}

.vk-node-drawer__modal > * {
  pointer-events: initial;
}
</style>
