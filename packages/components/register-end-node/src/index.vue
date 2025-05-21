<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkNodeComponent } from '@vunk-x16/components/node-component'
import type { __VkfInformation } from '@vunk/form'
import type { NodeData } from './types'
import { VkInformationTemplates } from '@vunk-x16/components/information-templates'
import { VkNodeCard } from '@vunk-x16/components/node-card'
import { fieldWithValueInformationItem } from '@vunk-x16/components/register-node'
import { VkEndIcon } from '@vunk-x16/icons/end'
import { setData } from '@vunk/core'
import { VkfInformation } from '@vunk/form'

import { defaultData, outputModeOptions, RegisterEndNodePort } from './const'
import DrawerForm from './drawer-form.vue'
// import { emits as dEmits, props as dProps } from './ctx'

type FormItem = __VkfInformation.FormItem<keyof NodeData>

defineOptions({
  name: 'VkRegisterEndNode',
})

// defineProps(dProps)
// defineEmits(dEmits)

const cardFormItems: FormItem[] = [
  {
    ...fieldWithValueInformationItem,
    label: '输出',
    prop: 'output',
  },
  {
    templateType: 'VkfSelect',
    label: '输出模式',
    prop: 'outputMode',
    options: outputModeOptions,
  },
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'passiveTop' as __VkNodeComponent.DefaultGroup,
    id: RegisterEndNodePort.input,
  },
]
</script>

<template>
  <VkNodeCard
    shape="VkRegisterEndNode"
    :ports="ports"
    :default-data="defaultData"
    description="工作流的结束节点，用于设定最终输出的文本模板"
  >
    <template #icon>
      <VkEndIcon color="var(--el-color-danger)"></VkEndIcon>
    </template>

    <template #default="{ data }">
      <VkfInformation
        :data="data"
        :form-items="cardFormItems"
      >
        <VkInformationTemplates />
      </VkfInformation>
    </template>

    <template #drawer="{ data, node }">
      <DrawerForm
        :data="data"
        :node="node"
        @set-data="setData(data, $event)"
      >
      </DrawerForm>
    </template>
  </VkNodeCard>
</template>

<style>
.vk-register-end-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-register-end-node__header {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.vk-register-end-node__header img {
  width: 1em;
  height: 1em;
  margin-right: 8px;
}

.vk-register-end-node {
  min-width: 300px;
}
</style>
