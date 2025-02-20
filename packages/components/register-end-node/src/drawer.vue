<script lang="ts" setup>
import type { __VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import { setData } from '@vunk/core'
import { VkfForm } from '@vunk/form'
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import Title from './title.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  shape: {
    type: String,
    default: 'VkRegisterEndNode',
  },
})

defineEmits({
  'update:modelValue': null,
})

const formItems: __VkNodeDrawer.FormItem[] = [

  {
    templateType: 'VkfRadio',
    prop: 'outputMode',
    label: '回答模式',
    options: [
      {
        label: '返回变量',
        value: 'returnVariables',
      },
      {
        label: '返回文本',
        value: 'returnDirectText',
      },
    ],
    labelPosition: 'right',
    formItemSize: 'default',
    defaultModelValue: 'returnVariables',

  },

  {
    templateType: 'VkfInputCollection',
    prop: 'output',
    label: '输出变量',
    labelTip: '这些变量将在智能体调用工作流完成后被输出。在“返回变量”模式中，这些变量会被智能体总结后回复用户；在“直接回答”模式中，智能体只会回复你设定的“回答内容”。但在任何模式中，这些变量都可以在配置卡片时使用。',
    splicable: false,
    columns: [
      {
        label: '字段',
        prop: 'name',
        templateType: 'VkfInput',
        templateProps: {
          disabled: true,
        },
      },
      {
        prop: 'type',
        templateType: 'VkfSelect',
        label: '类型',
        templateProps: {
          disabled: true,
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
        templateProps: {
          type: 'textarea',
          rows: 2,
          disabled: true,
        },
      },
    ],
  },
  {
    templateType: 'VkfInput',
    label: '回答文本',
    prop: 'textTemplate',
    type: 'textarea',
    rows: 4,
    labelTip: '编辑智能体的回复内容，即工作流运行完成后，智能体中的LLM将不再组织语言，而是直接用这里编辑的内容原文回复对话。 可以使用{{变量名}}的方式引用输入参数中的变量',

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
      工作流的结束节点，用于设定最终输出的文本模板
    </template>

    <template #default="{ data }">
      <VkfForm
        :data="data"
        size="small"
        :form-items="formItems"
        label-position="top"
        class="vk-register-end-drawer__form"
        @set-data="setData(data, $event)"
      >
      </VkfForm>
    </template>
  </VkNodeDrawer>
</template>
