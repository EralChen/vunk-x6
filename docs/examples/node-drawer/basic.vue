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

// Example node data
const nodeData = {
  title: 'Custom Node',
  description: 'Example node with custom content',
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
            <img
              class="w-6 h-6"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-NodeBasic-v3.jpg"
            />
            <span>Node Settings</span>
          </div>
        </template>

        <div class="p-4 space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Selected: {{ selectedNodes.length > 0 ? 'Yes' : 'No' }}</span>
          </div>

          <p class="text-sm text-gray-600">
            The drawer opens automatically when the node is selected.
            Try selecting/unselecting the node to see the drawer behavior.
          </p>
        </div>
      </VkNodeDrawer>
    </VkGraph>
  </div>
</template>
