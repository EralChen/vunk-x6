<script lang="ts" setup>
import type { __VkNode } from '@vunk-x6/components/node'
import type { __VkPort } from '@vunk-x6/components/port'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkPort } from '@vunk-x6/components/port'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'

const registerStartNodeData = {
  input: [
    {
      name: '变量1',
      type: 'string',
    },
  ],
}

function nodeLoad (e: __VkNode.LoadEvent) {
  console.log('nodeLoad', e)
}
</script>

<template>
  <div h-400px>
    <VkGraph>
      <VkRegisterStartNode></VkRegisterStartNode>

      <VkNode
        :shape="VkRegisterStartNode.name"
        :data="registerStartNodeData"
        @load="nodeLoad"
      >
        <VkPort group="bottom"></VkPort>
      </VkNode>
    </VkGraph>
  </div>
</template>
