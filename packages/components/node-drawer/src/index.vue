<script lang="ts">
import type { Cell } from '@antv/x6'
import { useModelComputed } from '@vunk/core/composables'
import { VkfTemplateInstancesProvider } from '@vunk/form/components/template-instances-provider'

import { useNodeData } from '@vunk-x6/components/node'
import { useGraph, useGraphEmitter } from '@vunk-x6/composables'
import { ElDrawer } from 'element-plus'
import { computed, defineComponent, shallowRef } from 'vue'
import { emits, props } from './ctx'
import FormTemplates from './form-templates.vue'

export default defineComponent({
  name: 'VkNodeDrawer',
  components: {
    ElDrawer,
    VkfTemplateInstancesProvider,
    FormTemplates,
  },
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    const { graphEmitterOn } = useGraphEmitter()
    const appendTo = graph.container.parentElement as HTMLDivElement

    const modelValue = useModelComputed({
      key: 'modelValue',
      default: false,
    }, props, emit)

    const currentNode = shallowRef<Cell>()
    const { nodeData } = useNodeData(currentNode)

    // Computed slot args with reactive data
    const slotArgs = computed(() => ({
      node: currentNode.value ?? {},
      attrs: currentNode.value?.attrs ?? {},
      graph,
      data: nodeData.value,
    }))

    // graph.on('selection:changed', onSelectionChanged)
    graphEmitterOn('node:click', ({ node }) => {
      // 当前点击的节点是不是该 drawer 对应的shape
      if (node.shape === props.shape) {
        currentNode.value = node
        modelValue.value = true
      }
      else {
        currentNode.value = undefined
        modelValue.value = false
      }
    })
    graphEmitterOn('blank:click', () => {
      currentNode.value = undefined
      modelValue.value = false
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
    class="vk-node-drawer"
    :append-to-body="true"
    modal-class="vk-node-drawer__modal"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :size="size"
    :show-close="false"
    :with-header="withHeader"
  >
    <!--    :append-to="appendTo" -->
    <template #header>
      <slot name="header" v-bind="slotArgs"></slot>
    </template>

    <VkfTemplateInstancesProvider>
      <FormTemplates></FormTemplates>
      <slot v-bind="slotArgs" />
    </VkfTemplateInstancesProvider>
  </ElDrawer>
</template>

<style>
.vk-node-drawer__modal {
  position: absolute;
  background-color: transparent;
  pointer-events: none;
}
.vk-node-drawer__modal .el-drawer__header {
  margin-bottom: 0;
  padding-bottom: var(--el-drawer-padding-primary);
  border-bottom: 1px solid var(--el-border-color);
}

.vk-node-drawer__modal .el-drawer {
  --el-drawer-padding-primary: 10px;
}
.vk-node-drawer__modal > * {
  pointer-events: initial;
}

.vk-node-drawer {
  box-shadow: none;
  border-left: var(--el-border-color) solid 1px;
}

.vk-input-collection__expand-fieldset .el-form-item__label {
  font-size: 0.8em;
}
.vkf-input-collection-table{
  margin-top: 0;
}
</style>
