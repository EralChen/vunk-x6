<script lang="ts" setup>
import { VkGraph } from '@vunk-x6/components/graph'
import { VkNode } from '@vunk-x6/components/node'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import { VkSelection } from '@vunk-x6/components/selection'
import { ref } from 'vue'

const visible = ref(false)
const shape = 'custom-node'
const selectedNodes = ref([])

// Example node data with reactivity
const nodeData = ref({
  title: 'Custom Node',
  description: 'Example node with custom content',
  count: 0,
})

// Function to update node data
function updateNodeData () {
  nodeData.value.count++
  nodeData.value.description = `Example node with custom content (Updated: ${nodeData.value.count})`
}
</script>

<template>
  <div class="h-400px relative">
    <VkGraph>
      <VkSelection v-model="selectedNodes" />

      <!-- Register custom node template -->
      <VkNodeComponent :shape="shape">
        <template #default="{ data }">
          <div class="p-2 bg-white border rounded-md w-40">
            <h3 class="text-lg font-medium">
              {{ data.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ data.description }}
            </p>
          </div>
        </template>
      </VkNodeComponent>

      <VkNode
        :shape="shape"
        :x="100"
        :y="100"
        :data="nodeData"
      />

      <VkNodeDrawer
        v-model="visible"
        :shape="shape"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <span>Node Settings</span>
          </div>
        </template>

        <template #default="{ data, attrs }">
          <div class="p-4 space-y-4">
            <!-- Display node data -->
            <div v-if="data" class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Node Data</span>
              </div>

              <div class="p-3 bg-gray-50 rounded space-y-3">
                <div class="flex gap-2">
                  <span class="text-gray-500">Title:</span>
                  <span>{{ data.title }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="text-gray-500">Description:</span>
                  <span>{{ data.description }}</span>
                </div>

                <div class="flex gap-2">
                  <span class="text-gray-500">Count:</span>
                  <span>{{ data.count }}</span>
                </div>

                <button
                  class="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  @click="updateNodeData"
                >
                  Update Node Data
                </button>
              </div>
            </div>

            <!-- Display node attributes -->
            <div v-if="attrs" class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full" />
                <span>Node Attributes</span>
              </div>

              <pre class="p-3 bg-gray-50 rounded text-sm">{{ attrs }}</pre>
            </div>

            <p class="text-sm text-gray-600">
              The drawer opens automatically when selecting a node of type "{{ shape }}".
              Try selecting/unselecting the node to see the drawer behavior.
            </p>
          </div>
        </template>
      </VkNodeDrawer>
    </VkGraph>
  </div>
</template>
