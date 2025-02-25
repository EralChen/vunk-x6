<script lang="ts" setup>
import type { __VkTemplatesDefault } from '@vunk-x6/components/templates-default'
import { VkRenderer } from '@vunk/core/components/renderer'
import { VkGraph } from '@vunk-x6/components/graph'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkTemplatesDefault } from '@vunk-x6/components/templates-default'

const source: __VkTemplatesDefault.SourceItem[] = [
  {
    templateType: 'VkRegisterLlmNode',
    x: 100,
    y: 100,
  },
]
</script>

<template>
  <div h-400px>
    <VkGraph>
      <VkRegisterLlmNode></VkRegisterLlmNode>

      <VkRenderer :source="source">
        <VkTemplatesDefault></VkTemplatesDefault>
      </VkRenderer>
    </VkGraph>
  </div>
</template>
