<script lang="ts" setup>
import type { __VkTemplatesDefault } from '@vunk-x16/components/templates-default'
import { VkGraph } from '@vunk-x16/components/graph'
import { defaultData, VkRegisterLlmNode } from '@vunk-x16/components/register-llm-node'
import { VkSelection } from '@vunk-x16/components/selection'
import { VkTemplatesDefault } from '@vunk-x16/components/templates-default'
import { setData } from '@vunk/core'
import { VkRenderer } from '@vunk/core/components/renderer'
import { VkRendererData } from '@vunk/core/components/renderer-data'
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'

const source = ref([] as __VkTemplatesDefault.SourceItem[])

setTimeout(() => {
  const sourceItem = {
    id: 'id1',
    templateType: 'VkRegisterLlmNode',
    x: 100,
    y: 100,
  } as __VkTemplatesDefault.SourceItem
  source.value.push(sourceItem)
}, 1000)

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

      <!-- <VkRendererData :data="data" @set-data="setData(data, $event)"> -->
      <VkRenderer :source="source">
        <VkTemplatesDefault></VkTemplatesDefault>
      </VkRenderer>
      <!-- </VkRendererData> -->
    </VkGraph>
  </div>
</template>
