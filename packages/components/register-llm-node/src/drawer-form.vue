<script lang="ts" setup>
import type { Node } from '@antv/x6'
import type { SetDataEvent } from '@vunk/core'
import type { Media } from '@vunk/shared'
import type { __VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import type OpenAI from 'openai'
import type { PropType } from 'vue'
import type { NodeData } from './types'
import { VkfForm } from '@vunk/form'
import { fieldColumnMap, useFieldValueRefOpitons } from '@vunk-x6/components/register-node'
import { onMounted, ref } from 'vue'

type FormItem = __VkNodeDrawer.FormItem<keyof NodeData>
const props = defineProps({
  data: null,
  node: {
    type: Object as PropType<Node>,
    default: null,
  },
  client: {
    type: Object as PropType<OpenAI>,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
})

defineEmits({
  setData: (e: SetDataEvent) => e,
})

const { fieldValueRefOptions } = useFieldValueRefOpitons(props.node)

const modelList = ref<Media[]>([])

onMounted(async () => {
  try {
    const models = await props.client.models.list()
    modelList.value = models.data.map(model => ({
      label: model.id,
      value: model.id,
    }))
  }
  catch (error) {
    console.error('Failed to fetch models:', error)
  }
})

const formItems: FormItem[] = [
  {
    templateType: 'VkfSelect',
    prop: 'modelId',
    label: '模型',
    templateProps () {
      return {
        options: modelList.value,
      }
    },
  },
  {
    templateType: 'VkfInputCollection',
    prop: 'input',
    label: '输入变量',
    columns: [
      fieldColumnMap.name,
      {
        ...fieldColumnMap.valueRef,
        createTemplateProps () {
          return {
            options: fieldValueRefOptions.value,
          }
        },
      },
    ],
  },
  {
    templateType: 'VkfInputCollection',
    prop: 'output',
    label: '输出变量',
    columns: [
      fieldColumnMap.name,
      fieldColumnMap.type,
      fieldColumnMap.description,
    ],
  },
]
</script>

<template>
  <VkfForm
    :data="data"
    size="small"
    :form-items="formItems"
    label-position="top"
    class="vk-register-llm-drawer__form"
    @set-data="$emit('setData', $event)"
  >
  </VkfForm>
</template>
