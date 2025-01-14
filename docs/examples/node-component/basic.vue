<script lang="ts" setup>
import type { __VkNode } from '@vunk-x6/components/node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkNodeComponent } from '@vunk-x6/components/node-component'

function nodeLoad (e: __VkNode.LoadEvent) {
  e.node.addPort({
    group: 'right',
    attrs: {},
  })
}
</script>

<template>
  <div class="h-400px">
    <VkGraph>
      <VkNodeComponent
        shape="custom-vue-node"
        :auto-size="true"
      >
        <ElButton type="success">
          start
        </ElButton>
      </VkNodeComponent>

      <VkNode
        shape="custom-vue-node"
        :x="140"
        :y="100"
        @load="nodeLoad"
      ></VkNode>
    </VkGraph>
  </div>
</template>
