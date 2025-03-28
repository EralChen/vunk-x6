<script lang="ts" setup>
import { SplitGridSidebar } from '@/layouts/split-grid'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkRegisterEndNode } from '@vunk-x6/components/register-end-node'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkSelection } from '@vunk-x6/components/selection'
import { ref } from 'vue'
import Dnd from './dnd.vue'

const selectedNodes = ref([])
</script>

<template>
  <!-- 初始化 X6 画布 -->
  <VkGraph>
    <!-- 注册开始节点 -->
    <VkRegisterStartNode />
    <!-- 注册结束节点 -->
    <VkRegisterEndNode />
    <!-- 注册 LLM 节点 -->
    <VkRegisterLlmNode />
    <!-- 选中插件 -->
    <VkSelection
      v-model="selectedNodes"
    />

    <SplitGridSidebar>
      <Dnd />
    </SplitGridSidebar>

    <!-- 实例化开始节点 -->
    <VkNode
      :shape="VkRegisterStartNode.name"
      :x="100"
      :y="300"
    ></VkNode>
    <!-- 实例化 LLM 节点 -->
    <VkNode
      :shape="VkRegisterLlmNode.name"
      :x="100"
      :y="600"
    ></VkNode>
    <!-- 实例化结束节点 -->
    <VkNode
      :shape="VkRegisterEndNode.name"
      :x="100"
      :y="1000"
    ></VkNode>
  </VkGraph>
</template>
