<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { Field } from '@vunk-x16/shared'
import type { __VkfInformation, __VkfInput } from '@vunk/form'
import { VkInformationTemplates } from '@vunk-x16/components/information-templates'
import { VkNodeCard } from '@vunk-x16/components/node-card'
import { defaultAttrs } from '@vunk-x16/components/port'
import { fieldColumnMap, fieldInformationItem } from '@vunk-x16/components/register-node'
import { VkStartIcon } from '@vunk-x16/icons/start'
import { setData } from '@vunk/core'
import { VkfForm, VkfInformation } from '@vunk/form'
import { defaultData, RegisterStartNodePort } from './const'

defineOptions({
  name: 'VkRegisterStartNode',
})

const cardFormItems: __VkfInformation.FormItem[] = [
  {
    ...fieldInformationItem,
    label: '输出',
    prop: 'output',
  },
]

const drawerFormItems: __VkfInformation.FormItem[] = [
  {
    templateType: 'VkfInputCollection',
    prop: 'output',
    label: '输出',
    splicable: false,
    defaultExpandAll: true,
    columns: [
      {
        ...fieldColumnMap.name,
        createTemplateProps: () => ({
          disabled: true,
        }),
      },
      {
        ...fieldColumnMap.type,
        createTemplateProps: () => ({
          disabled: true,
        }),
      },
      {
        ...fieldColumnMap.defaultValue,
        createTemplateProps (e) {
          const data = e.row as Field
          const config = {
            ...fieldColumnMap.defaultValue.templateProps,
          } as __VkfInput.Source

          if (data.name !== 'USER_INPUT') {
            config.disabled = true
          }

          return config
        },
      },
      {
        ...fieldColumnMap.description,
        createTemplateProps: () => ({
          disabled: true,
        }),
      },
    ],
  },
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'activeBottom',
    id: RegisterStartNodePort.output,
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: 'active',
      },

    },
  },
]
</script>

<template>
  <VkNodeCard
    shape="VkRegisterStartNode"
    :ports="ports"
    :default-data="defaultData"
    description="工作流的起始节点，用于设定启动工作流需要的信息"
  >
    <template #icon>
      <VkStartIcon color="var(--el-color-success)"></VkStartIcon>
    </template>

    <template #default="{ data }">
      <VkfInformation
        :data="data"
        :form-items="cardFormItems"
      >
        <VkInformationTemplates />
      </VkfInformation>
    </template>

    <template #drawer="{ data }">
      <VkfForm
        :data="data"
        size="small"
        :form-items="drawerFormItems"
        label-position="top"
        class="vk-register-start-drawer__form"
        @set-data="setData(data, $event)"
      >
      </VkfForm>
    </template>
  </VkNodeCard>
</template>

<style>
.vk-register-start-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-register-start-node{
  min-width: 380px;
}
</style>
