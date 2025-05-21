<script lang="ts" setup>
import { VkRegisterEndNode } from '@vunk-x16/components/register-end-node'
import { VkRegisterLlmNode } from '@vunk-x16/components/register-llm-node'
import { VkRegisterSenderNode } from '@vunk-x16/components/register-sender-node'
import { VkRegisterStartNode } from '@vunk-x16/components/register-start-node'
</script>

<template>
  <!-- 注册开始节点 -->
  <VkRegisterStartNode />
  <!-- 注册结束节点 -->
  <VkRegisterEndNode />
  <!-- 注册 LLM 节点 -->
  <VkRegisterLlmNode />

  <VkRegisterSenderNode />
</template>
