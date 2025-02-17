<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x6/components/node'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkSelection } from '@vunk-x6/components/selection'
import { reactive } from 'vue'

const registerStartNodeData = reactive({
  input: [
    {
      name: 'query',
      type: 'string',
      description: '用户输入',
    },
    {
      name: 'conversationId',
      type: 'string',
      description: '会话 ID',
    },
  ] as __VkRegisterStartNode.InputItem[],
})

const graphOptions: Graph.Options = {
}
</script>

<template>
  <div class="h-400px border-1 border-gray">
    <VkGraph :default-options="graphOptions">
      <!-- 注册开始节点 -->
      <VkRegisterStartNode></VkRegisterStartNode>

      <VkSelection></VkSelection>

      <!-- 使用开始节点渲染实例 -->
      <VkNode
        :shape="VkRegisterStartNode.name"
        :x="100"
        :y="100"
        :data="registerStartNodeData"
      />
    </VkGraph>
  </div>
</template>
