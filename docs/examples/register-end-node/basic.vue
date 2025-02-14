<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x6/components/node'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { reactive } from 'vue'

const registerStartNodeData = reactive({
  input: [
    {
      name: 'query',
      type: 'string',
    },
  ],
} as __VkRegisterStartNode.Data)

const llmNodeData = reactive({
  modelId: 'gpt-3.5-turbo',
  prompt: '你好',
})

const graphOptions: Graph.Options = {
  connecting: {

  },
}
</script>

<template>
  <div class="h-400px border-1 border-gray">
    <VkGraph :default-options="graphOptions">
      <!-- 注册开始节点 -->
      <VkRegisterStartNode></VkRegisterStartNode>
      <!-- 注册 LLM 节点 -->
      <VkRegisterLlmNode></VkRegisterLlmNode>
      <!-- 注册结束节点 -->
      <VkRegisterEndNode></VkRegisterEndNode>

      <!-- 使用开始节点渲染实例 -->
      <VkNode
        :shape="VkRegisterStartNode.name"
        :x="100"
        :y="100"
        :data="registerStartNodeData"
      />

      <VkNode
        :shape="VkRegisterLlmNode.name"
        :x="300"
        :y="100"
        :data="llmNodeData"
      />

      <VkNode
        :shape="VkRegisterEndNode.name"
        :x="500"
        :y="100"
      />
    </VkGraph>
  </div>
</template>
