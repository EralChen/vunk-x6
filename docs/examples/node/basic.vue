<script lang="ts" setup>
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
</script>

<template>
  <div class="h-400px">
    <VkGraph>
      <VkNode
        :width="200"
        :height="100"
        :x="140"
        :y="100"
        @click="(e) => {
          console.log('Node clicked:', e)
        }"
      ></VkNode>
    </VkGraph>
  </div>
</template>
