<script lang="ts">
import type { Cell } from '@antv/x6'
import { useModelComputed } from '@vunk/core/composables'
import { VkfFormItemRendererTemplate } from '@vunk/form'
import VkfInputCollection from '@vunk/form/components/input-collection'
import { VkfTemplateInstancesProvider } from '@vunk/form/components/template-instances-provider'
import { VkfTemplatesDefault } from '@vunk/form/components/templates-default'
import { useNodeData } from '@vunk-x6/components/node'
import { useGraph } from '@vunk-x6/composables'
import { ElDrawer } from 'element-plus'
import { computed, defineComponent, onBeforeUnmount, shallowRef } from 'vue'
import CustomHeader from './components/custom-header.vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkNodeDrawer',
  components: {
    ElDrawer,
    CustomHeader,
    VkfTemplateInstancesProvider,
    VkfFormItemRendererTemplate,
    VkfInputCollection,
    VkfTemplatesDefault,
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
    const { nodeData } = useNodeData(currentNode)

    function onSelectionChanged () {
      if (!graph.getSelectedCells)
        return

      const selectedCells = graph.getSelectedCells()
      const last = selectedCells.at(-1)

      // Update model value based on shape
      modelValue.value = last?.shape === props.shape

      // Track current node and update data
      if (last?.shape === props.shape && last) {
        currentNode.value = last
      }
      else {
        currentNode.value = undefined
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
    class="vk-node-drawer"
    :append-to-body="true"
    modal-class="vk-node-drawer__modal"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :size="size"
    :show-close="false"
  >
    <!--    :append-to="appendTo" -->
    <template #header>
      <slot name="header" v-bind="slotArgs">
        <CustomHeader @close="modelValue = false">
          <template #title>
            <slot name="title" v-bind="slotArgs" />
          </template>
          <template #actions>
            <slot name="actions" v-bind="slotArgs" />
          </template>
          <template #description>
            <slot name="description" v-bind="slotArgs" />
          </template>
        </CustomHeader>
      </slot>
    </template>
    <VkfTemplateInstancesProvider>
      <VkfTemplatesDefault />
      <VkfFormItemRendererTemplate type="VkfInputCollection">
        <template #default="{ props, input, value }">
          <VkfInputCollection
            v-bind="props"
            :model-value="value"
            :label-actions="true"
            @update:model-value="input"
          ></VkfInputCollection>
        </template>
      </VkfFormItemRendererTemplate>

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

.vk-input-collection__expand-fieldset .el-form-item__label {
  font-size: 0.8em;
}
.vkf-input-collection-table{
  margin-top: 0;
}
</style>
