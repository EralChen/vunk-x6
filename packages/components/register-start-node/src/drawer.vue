<script lang="ts" setup>
import type { __VkfForm } from '@vunk/form'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { NodeData } from './types'
import { setData } from '@vunk/core'
import { VkfForm, VkfFormItemRendererTemplate } from '@vunk/form'
import { VkfInputCollection } from '@vunk/form/components/input-collection'
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import Title from './title.vue'

type Keys = keyof NodeData

type FormItem = __VkfForm.FormItem<Keys>
  | __VkfInputCollection.Source<Keys>

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
    columns: [
      {
        label: '字段',
        prop: 'name',
        templateType: 'VkfInput',
        templateProps: {
          readonly: true,
        },
      },
      {
        prop: 'type',
        templateType: 'VkfSelect',
        label: '类型',
        templateProps: {
          readonly: true,
          options: [
            {
              label: '字符串',
              value: 'string',
            },
          ],
        },
      },
      {
        prop: 'description',
        templateType: 'VkfInput',
        label: '描述',
        expandVisible: true,
        hidden: true,
      },
    ],
  },
]
</script>

<template>
  <VkNodeDrawer
    :model-value="modelValue"
    :shape="shape"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #title>
      <Title></Title>
    </template>
    <template #description>
      工作流的起始节点，用于设定启动工作流需要的信息
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
        <template #rendererTemplate>
          <VkfFormItemRendererTemplate type="VkfInputCollection">
            <template #default="{ props, input, value }">
              <VkfInputCollection
                v-bind="props"
                :model-value="value"
                :label-actions="true"
                @update:model-value="input"
              ></VkfInputCollection>
            </template>
          </VkfFormItemRendererTemplate>
        </template>
      </VkfForm>
    </template>
  </VkNodeDrawer>
</template>

<style>
.vk-register-start-drawer__form .vkf-input-collection-table{
  margin-top: 0;
}
</style>
