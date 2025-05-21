<script lang="ts" setup>
import { VkNode } from '@vunk-x16/components/node'
import { VkRegisterEndNode } from '@vunk-x16/components/register-end-node'
import { VkRegisterStartNode } from '@vunk-x16/components/register-start-node'
import { VkSelection } from '@vunk-x16/components/selection'
import { ref } from 'vue'

const selectedNodes = ref([])
</script>

<template>
  <!-- 选中插件 -->
  <VkSelection
    v-model="selectedNodes"
  />

  <!-- 实例化开始节点 -->
  <!-- <VkNode
    :shape="VkRegisterStartNode.name"
    :x="100"
    :y="300"
  ></VkNode> -->

  <!-- 实例化结束节点 -->
  <!-- <VkNode
    :shape="VkRegisterEndNode.name"
    :x="100"
    :y="1000"
  ></VkNode> -->
</template>
