<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x6/components/node'
import type { __VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { defaultData, VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkSelection } from '@vunk-x6/components/selection'
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'

const endNodeData = reactive(cloneDeep(defaultData))

const graphOptions: Graph.Options = {}

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
        <VkSelection></VkSelection>
        <!-- 注册开始节点 -->
        <VkRegisterStartNode></VkRegisterStartNode>
        <!-- 注册 LLM 节点 -->
        <VkRegisterLlmNode></VkRegisterLlmNode>
        <!-- 注册结束节点 -->
        <VkRegisterEndNode></VkRegisterEndNode>

        <VkNode
          :shape="VkRegisterStartNode.name"
          :x="0"
          :y="100"
        />

        <VkNode
          :shape="VkRegisterLlmNode.name"
          :x="200"
          :y="100"
        />

        <VkNode
          :shape="VkRegisterEndNode.name"
          :x="400"
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
