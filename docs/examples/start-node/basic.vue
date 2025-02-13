<script lang="ts" setup>
import type { __VkNode } from '@vunk-x6/components/node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkStartNode } from '@vunk-x6/components/start-node'
import { reactive } from 'vue'

const startNodeData = reactive({
  input: [
    {
      name: 'USER_INPUT',
      type: 'string',
    },
  ],
})
</script>

<template>
  <div class="h-400px border-1 border-gray">
    <VkGraph>
      <!-- 注册开始节点 -->
      <VkStartNode></VkStartNode>

      <!-- 使用开始节点渲染实例 -->
      <VkNode
        :shape="VkStartNode.name"
        :x="100"
        :y="100"
        :data="startNodeData"
      />
    </VkGraph>
  </div>
</template>
