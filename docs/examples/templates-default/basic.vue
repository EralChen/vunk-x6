<script lang="ts" setup>
import type { __VkTemplatesDefault } from '@vunk-x6/components/templates-default'
import { setData } from '@vunk/core'
import { VkRenderer } from '@vunk/core/components/renderer'
import { VkRendererData } from '@vunk/core/components/renderer-data'
import { VkGraph } from '@vunk-x6/components/graph'
import { defaultData, VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkSelection } from '@vunk-x6/components/selection'
import { VkTemplatesDefault } from '@vunk-x6/components/templates-default'
import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

const source: __VkTemplatesDefault.SourceItem[] = [
  {
    id: 'id1',
    templateType: 'VkRegisterLlmNode',
    x: 100,
    y: 100,
  },
]

const data = reactive({
  id1: cloneDeep(defaultData),
})
</script>

<template>
  <div h-400px>
    {{ data }}

    <VkGraph>
      <VkSelection></VkSelection>
      <VkRegisterLlmNode></VkRegisterLlmNode>

      <VkRendererData :data="data" @set-data="setData(data, $event)">
        <VkRenderer :source="source">
          <VkTemplatesDefault></VkTemplatesDefault>
        </VkRenderer>
      </VkRendererData>
    </VkGraph>
  </div>
</template>
