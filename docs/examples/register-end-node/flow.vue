<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x6/components/node'
import type { __VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { defaultData, VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'

const registerStartNodeData = reactive(cloneDeep(defaultData))

const llmNodeData = reactive({
  modelId: 'gpt-3.5-turbo',
  prompt: '你好',
})

const endNodeData = reactive({
  output: [
    {
      name: 'response',
      type: 'string',
    },
  ],
  textTemplate: '{{response}}',
} as __VkRegisterEndNode.NodeData)

const graphOptions: Graph.Options = {
}

const graphInstance = ref<Graph>()
const exportedConfig = ref('')

function handleLoad (e: { graph: Graph }) {
  graphInstance.value = e.graph
}

function handleExport () {
  if (!graphInstance.value)
    return

  const config = graphInstance.value.toJSON()
  exportedConfig.value = JSON.stringify(config, null, 2)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="h-400px border-1 border-gray">
      <VkGraph
        :default-options="graphOptions"
        @load="handleLoad"
      >
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
          :data="endNodeData"
        />
      </VkGraph>
    </div>
    <div class="px-4">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="handleExport"
      >
        导出图形配置
      </button>
      <pre v-if="exportedConfig" class="mt-4 p-4 bg-gray-100 rounded overflow-auto">{{ exportedConfig }}</pre>
    </div>
  </div>
</template>
