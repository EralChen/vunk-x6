<script lang="ts" setup>
import type { SlotProps } from './types'
import { VkNodeComponent } from '@vunk-x6/components/node-component'

defineOptions({
  name: 'VkStartNode',
})

defineSlots<{
  default?: (props: SlotProps) => any
}>()
</script>

<template>
  <VkNodeComponent
    shape="VkStartNode"
    :auto-size="true"
  >
    <template #default="nodeProps">
      <div class="vk-start-node">
        <slot
          :data="nodeProps.data"
          :node="nodeProps.node"
          :graph="nodeProps.graph"
        >
          {{ nodeProps.data?.title || '开始' }}
        </slot>
      </div>
    </template>
  </VkNodeComponent>
</template>

<style>
.vk-start-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
</style>
