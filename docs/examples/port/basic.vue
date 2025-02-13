<script lang="ts" setup>
import type { __VkStartNode } from '@vunk-x6/components/start-node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkPort } from '@vunk-x6/components/port'
import { VkStartNode } from '@vunk-x6/components/start-node'

const startNodeData: __VkStartNode.Data = {
  input: [
    {
      name: '变量1',
      type: 'string',
    },
  ],
}
</script>

<template>
  <div h-400px>
    <VkGraph>
      <VkStartNode></VkStartNode>

      <VkNode
        :shape="VkStartNode.name"
        :data="startNodeData"
      >
        <!-- 添加连接桩 -->
        <VkPort></VkPort>
      </VkNode>
    </VkGraph>
  </div>
</template>
