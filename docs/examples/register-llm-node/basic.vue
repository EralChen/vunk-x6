<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x16/components/node'
import { VkGraph } from '@vunk-x16/components/graph'
import { VkNode } from '@vunk-x16/components/node'
import { VkRegisterLlmNode } from '@vunk-x16/components/register-llm-node'
import { VkRegisterStartNode } from '@vunk-x16/components/register-start-node'
import { VkSelection } from '@vunk-x16/components/selection'
import { ref } from 'vue'

const llmNodeData = ref({
})

const graphOptions: Graph.Options = {
  connecting: {

  },
}
</script>

<template>
  <div class="h-400px border-1 border-gray">
    {{ llmNodeData }}
    <VkGraph :default-options="graphOptions">
      <VkSelection></VkSelection>

      <!-- 注册开始节点 -->
      <VkRegisterStartNode></VkRegisterStartNode>
      <!-- 注册 LLM 节点 -->
      <VkRegisterLlmNode></VkRegisterLlmNode>

      <VkNode
        id="node2"
        v-model:data="llmNodeData"
        :shape="VkRegisterLlmNode.name"
      />
    </VkGraph>
  </div>
</template>
