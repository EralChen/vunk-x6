<script lang="ts" setup>
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkSelection } from '@vunk-x6/components/selection'
import { ref } from 'vue'

const selected = ref([])
const mutiple = ref(true)
</script>

<template>
  <div class="mb-4">
    Selected nodes: {{ selected }}
  </div>
  <div class="h-400px">
    <VkGraph class="selection-app">
      <VkSelection
        v-model="selected"
        :mutiple="mutiple"
      >
        <VkNode
          id="node1"
          :width="180"
          :height="80"
          :x="100"
          :y="80"
        >
          Node 1
        </VkNode>
      </VkSelection>
    </VkGraph>
  </div>
</template>

<style lang="scss">
.selection-app {
  .x6-widget-selection-box {
    border: 2px dashed #239edd;
  }

  .x6-widget-selection-inner {
    border: 1px solid #239edd;
  }
}
</style>
