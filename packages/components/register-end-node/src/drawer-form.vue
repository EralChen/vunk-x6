<script lang="ts" setup>
import type { Node } from '@antv/x6'
import type { SetDataEvent } from '@vunk/core'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { __VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import type { FieldWithValue } from '@vunk-x6/shared'
import type { PropType } from 'vue'
import type { NodeData } from './types'
import { VkfForm } from '@vunk/form'
import { fieldColumnMap, useDynamicFieldValueColumn } from '@vunk-x6/components/register-node'
import { OutputMode, outputModeOptions } from './const'

type FormItem = __VkNodeDrawer.FormItem<keyof NodeData>
type ConlectionColumn = __VkNodeDrawer.InputCollectionColumn<FieldWithValue>

const props = defineProps({
  data: null,
  formItems: null,
  node: {
    type: Object as PropType<Node>,
    default: null,
  },
})

const emit = defineEmits({
  setData: (e: SetDataEvent) => e,
})

const { fieldValueColumn } = useDynamicFieldValueColumn(props.node)

const outputColumns: ConlectionColumn[] = [
  fieldColumnMap.name,
  {
    ...fieldColumnMap.type,
    createTemplateProps ({ $index }) {
      return {
        onChange: () => {
          // 重置当前字段的值
          emit('setData', {
            k: ['output', $index, 'value'],
            v: undefined,
          })
        },
      }
    },
  },
  fieldValueColumn.value,
  {
    prop: 'children',
    label: '子项',
    templateType: 'VkfInputCollection',
    expandVisible: true,
    hidden: true,
    templateProps: {
      labelPosition: 'top',
    },
    createTemplateProps () {
      return {
        columns: outputColumns,
      }
    },

  },
]

const formItems: FormItem[] = [
  {
    templateType: 'VkfRadio',
    prop: 'outputMode',
    label: '输出模式',
    options: outputModeOptions,
    labelPosition: 'right',
    formItemSize: 'default',
    defaultModelValue: OutputMode.returnText,
  },

  {
    templateType: 'VkfInputCollection',
    prop: 'output',
    label: '输出变量',
    labelTip: '这些变量将在智能体调用工作流完成后被输出。在“返回变量”模式中，这些变量会被智能体总结后回复用户；在“直接回答”模式中，智能体只会回复你设定的“回答内容”。但在任何模式中，这些变量都可以在配置卡片时使用。',
    columns: outputColumns,
  },

  {
    templateType: 'VkfInput',
    label: '回答文本',
    prop: 'textTemplate',
    type: 'textarea',
    labelTip: '编辑智能体的回复内容，即工作流运行完成后，智能体中的LLM将不再组织语言，而是直接用这里编辑的内容原文回复对话。 可以使用{{变量名}}的方式引用输入参数中的变量',
    templateIf: data => data.outputMode === OutputMode.returnText,
  },
]
</script>

<template>
  <VkfForm
    :data="data"
    size="small"
    :form-items="formItems"
    label-position="top"
    class="vk-register-end-drawer__form"
    @set-data="$emit('setData', $event)"
  >
  </VkfForm>
</template>
