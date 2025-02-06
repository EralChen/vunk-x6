<script lang="ts" setup>
import { VkEdge } from '@vunk-x6/components/edge'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
</script>

<template>
  <div class="h-400px">
    <VkGraph>
      <VkNode
        id="node1"
        :width="200"
        :height="100"
        :x="140"
        :y="100"
      ></VkNode>

      <VkNode
        id="node2"
        :width="200"
        :height="100"
        :x="240"
        :y="300"
      ></VkNode>

      <VkEdge
        :target="{
          cell: 'node1',
        }"
        :source="{
          cell: 'node2',
        }"
      ></VkEdge>
    </VkGraph>
  </div>
</template>
