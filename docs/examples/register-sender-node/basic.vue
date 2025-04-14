<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkRegisterSenderNode } from '@vunk-x6/components/register-sender-node'
import { VkSelection } from '@vunk-x6/components/selection'

const graphOptions: Graph.Options = {}
</script>

<template>
  <div class="h-400px border-1 border-gray">
    <VkGraph :default-options="graphOptions">
      <VkSelection></VkSelection>

      <!-- 注册节点 -->
      <VkRegisterSenderNode></VkRegisterSenderNode>

      <VkNode
        :shape="VkRegisterSenderNode.name"
      />
    </VkGraph>
  </div>
</template>
