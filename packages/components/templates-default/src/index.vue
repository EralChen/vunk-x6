<script lang="ts">
import { VkNode } from '@vunk-x6/components/node'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VkTemplatesDefault',
  components: {
    VkRendererTemplate,
    VkNode,
  },
  setup () {
    const simpleTemplates = [
      'VkRegisterLlmNode',
      'VkRegisterSenderNode',
    ]
    return {
      simpleTemplates,
    }
  },
})
</script>

<template>
  <VkRendererTemplate
    v-for="shape of simpleTemplates"
    :key="shape"
    :type="shape"
  >
    <template #default="{ props }">
      <VkNode
        v-bind="props"
        :shape="shape"
      ></VkNode>
    </template>
  </VkRendererTemplate>
</template>
