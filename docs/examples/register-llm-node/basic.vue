<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x6/components/node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { reactive } from 'vue'

const registerStartNodeData = reactive({
  input: [
    {
      name: 'USER_INPUT',
      type: 'string',
    },
  ],
})

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

      <VkNode
        id="node2"
        :shape="VkRegisterLlmNode.name"
        :x="300"
        :y="100"
        :data="llmNodeData"
      />
    </VkGraph>
  </div>
</template>
