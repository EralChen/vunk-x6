<script lang="ts">
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { VkNode } from '@vunk-x6/components/node'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VkTemplatesDefault',
  components: {
    VkRendererTemplate,
    VkNode,
  },
  setup () {
    return {}
  },
})
</script>

<template>
  <VkRendererTemplate type="VkRegisterLlmNode">
    <template #default="{ props }">
      <VkNode
        shape="VkRegisterLlmNode"
        v-bind="props"
      ></VkNode>
    </template>
  </VkRendererTemplate>
</template>
