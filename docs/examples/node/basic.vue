<script lang="ts" setup>
import type { __VkNode } from '@vunk-x6/components/node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'

const nodeClick: __VkNode.OnClick = (e) => {
  console.log('Node clicked:', e.event)
}
</script>

<template>
  <div class="h-400px">
    <VkGraph>
      <VkNode
        :width="200"
        :height="100"
        @click="nodeClick"
      ></VkNode>
    </VkGraph>
  </div>
</template>
