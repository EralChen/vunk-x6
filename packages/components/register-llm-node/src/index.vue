<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import type { __VkNodeComponent } from '@vunk-x6/components/node-component'
import type { NodeData } from './types'
import { setData } from '@vunk/core'

import { VkfInformation } from '@vunk/form'
import { VkInformationTemplates } from '@vunk-x6/components/information-templates'
import { VkNodeCard } from '@vunk-x6/components/node-card'

import { fieldInformationItem, fieldWithValueInformationItem } from '@vunk-x6/components/register-node'
import { VkLlmIcon } from '@vunk-x6/icons/llm'
import { watchEffect } from 'vue'
import { defaultData, RegisterLlmNodePort } from './const'
import { props as dProps } from './ctx'
import DrawerForm from './drawer-form.vue'

defineOptions({
  name: 'VkRegisterLlmNode',
})

const props = defineProps(dProps)

watchEffect(() => {
  // eslint-disable-next-line vue/no-mutating-props
  props.client.apiKey = props.apiKey
})

type CardFormItem = __VkfInformation.FormItem<keyof NodeData>

const cardFormItems: CardFormItem[] = [
  {
    templateType: 'VkfSelect',
    label: '模型',
    prop: 'modelId',
  },

  {
    label: '输入',
    prop: 'input',
    ...fieldWithValueInformationItem,
  },

  {
    label: '输出',
    prop: 'output',
    ...fieldInformationItem,
  },
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'passiveTop' as __VkNodeComponent.DefaultGroup,
    id: RegisterLlmNodePort.input,

  },
  {
    group: 'activeBottom' as __VkNodeComponent.DefaultGroup,
    id: RegisterLlmNodePort.output,
  },
]
</script>

<template>
  <VkNodeCard
    shape="VkRegisterLlmNode"
    :default-data="defaultData"
    :ports="ports"
    description=" 大模型节点，用于配置模型参数和输入输出"
  >
    <template #icon>
      <VkLlmIcon></VkLlmIcon>
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
        :node="node"
        :data="data"
        @set-data="setData(data, $event)"
      ></DrawerForm>
    </template>
  </VkNodeCard>
</template>
