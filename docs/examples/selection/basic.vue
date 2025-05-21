<script lang="ts" setup>
import { VkGraph } from '@vunk-x16/components/graph'
import { VkNode } from '@vunk-x16/components/node'
import { VkSelection } from '@vunk-x16/components/selection'
import { ref } from 'vue'

const mutiple = ref(false)
const selected = ref([])
</script>

<template>
  <div>
    {{ selected }} 1111
  </div>
  <div class="h-400px">
    <VkGraph class="selection-app">
      <VkSelection
        v-model="selected"
        :mutiple="mutiple"
      >
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
          :x="140"
          :y="100"
        ></VkNode>
      </VkSelection>
    </VkGraph>
  </div>
</template>
