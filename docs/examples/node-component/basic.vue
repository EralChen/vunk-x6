<script lang="ts" setup>
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
</script>

<template>
  <div class="h-400px">
    <VkGraph>
      <VkNodeComponent
        shape="custom-vue-node"
      >
        <ElButton>hhhh</ElButton>
      </VkNodeComponent>

      <VkNode
        shape="custom-vue-node"
        :width="200"
        :height="100"
        :x="140"
        :y="100"
      ></VkNode>
    </VkGraph>
  </div>
</template>
