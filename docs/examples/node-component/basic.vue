<script lang="ts" setup>
import type { __VkNode } from '@vunk-x6/components/node'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { reactive } from 'vue'

const nodeData = reactive({
  title: 'Node',
})

function nodeLoad (e: __VkNode.LoadEvent) {
  e.node.addPort({
    group: 'right',
    attrs: {},
  })
}
</script>

<template>
  <div class="h-400px">
    <ElButton
      type="primary"
      @click="nodeData.title = 'Node Title'"
    >
      change node title
    </ElButton>

    <VkGraph>
      <VkNodeComponent
        shape="custom-vue-node"
        :auto-size="true"
      >
        <template #default="{ data }">
          <ElButton type="success">
            {{ data.title }}
          </ElButton>
        </template>
      </VkNodeComponent>

      <VkNode
        shape="custom-vue-node"
        :x="140"
        :y="100"
        :data="nodeData"
        @load="nodeLoad"
      ></VkNode>
    </VkGraph>
  </div>
</template>
