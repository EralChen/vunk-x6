<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x6/components/node'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { defaultData, VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkSelection } from '@vunk-x6/components/selection'
import { reactive, ref } from 'vue'

const startNodeData = ref(defaultData)
const startNodeData2 = {
  ...defaultData,
  label: '开始节点2',
} as __VkRegisterStartNode.NodeData

const graphOptions: Graph.Options = {
}
</script>

<template>
  <div class="h-400px border-1 border-gray">
    <VkGraph :default-options="graphOptions">
      <!-- 注册开始节点 -->
      <VkRegisterStartNode></VkRegisterStartNode>

      <VkSelection></VkSelection>

      <button @click="startNodeData = startNodeData2">
        更新开始节点数据
      </button>
      <!-- 使用开始节点渲染实例 -->
      <VkNode
        v-model:data="startNodeData"
        :shape="VkRegisterStartNode.name"
        :x="100"
        :y="100"
      />
    </VkGraph>
  </div>
</template>
