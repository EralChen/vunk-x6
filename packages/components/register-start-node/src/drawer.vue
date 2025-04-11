<script lang="ts" setup>
import type { __VkfForm, __VkfInput } from '@vunk/form'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { __VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import type { Field } from '@vunk-x6/shared'
import type { NodeData } from './types'
import { setData } from '@vunk/core'
import { VkfForm } from '@vunk/form'
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import { VkNodeHeader } from '@vunk-x6/components/node-header'
import { fieldColumnMap } from '@vunk-x6/components/register-node'
import { VkStartIcon } from '@vunk-x6/icons/start'

type Keys = keyof NodeData
type FormItem = __VkNodeDrawer.FormItem<Keys>

defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  shape: {
    type: String,
    default: 'VkRegisterStartNode',
  },
})

defineEmits({
  'update:modelValue': null,
})

const formItems: FormItem[] = [
  {
    templateType: 'VkfInputCollection',
    prop: 'input',
    label: '输入',
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
</script>

<template>
  <VkNodeDrawer
    class="vk-node-drawer"
    :model-value="modelValue"
    :shape="shape"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #header="{ data, node }">
      <VkNodeHeader
        :node="node"
        :title="data.label"
        description="工作流的起始节点，用于设定启动工作流需要的信息"
      >
        <template #icon>
          <VkStartIcon color="var(--el-color-success)"></VkStartIcon>
        </template>
      </VkNodeHeader>
    </template>

    <template #default="{ data }">
      <VkfForm
        :data="data"
        size="small"
        :form-items="formItems"
        label-position="top"
        class="vk-register-start-drawer__form"
        @set-data="setData(data, $event)"
      >
      </VkfForm>
    </template>
  </VkNodeDrawer>
</template>

<style>
.vk-node-drawer .vk-node-header__title{
  font-size: 1.2em;
}
</style>
