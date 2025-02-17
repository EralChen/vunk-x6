<script lang="ts">
import { useModelComputed } from '@vunk/core/composables'

import { useGraph } from '@vunk-x6/composables'
import { ElDrawer } from 'element-plus'
import { defineComponent, shallowRef } from 'vue'
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

    // [TODO] 选中数据
    // const current = shallowRef(null)

    function onSelectionChanged () {
      const selectedCells = graph.getSelectedCells()
      const last = selectedCells.at(-1)
      modelValue.value = last?.shape === props.shape
    }

    graph.on('selection:changed', onSelectionChanged)
    graph.on('node:click', onSelectionChanged)

    return {
      modelValue,
      appendTo,
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
    :size="300"
  >
    <template #header>
      <slot name="header" />
    </template>
    <slot />
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
