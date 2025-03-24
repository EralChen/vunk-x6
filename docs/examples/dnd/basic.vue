<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkNode } from '@vunk-x6/components/node'
import type { __VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkDnd } from '@vunk-x6/components/dnd'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkSelection } from '@vunk-x6/components/selection'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="h-400px border-1 border-gray">
      <VkGraph>
        <VkSelection></VkSelection>
        <!-- 注册开始节点 -->
        <VkRegisterStartNode></VkRegisterStartNode>
        <!-- 注册 LLM 节点 -->
        <VkRegisterLlmNode></VkRegisterLlmNode>
        <!-- 注册结束节点 -->
        <VkRegisterEndNode></VkRegisterEndNode>

        <div pos-absolute top-0 z-10>
          <VkDnd></VkDnd>
        </div>
      </VkGraph>
    </div>
  </div>
</template>
