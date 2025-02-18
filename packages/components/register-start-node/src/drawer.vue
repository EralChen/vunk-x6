<script lang="ts" setup>
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import Title from './title.vue'

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
  </VkNodeDrawer>
</template>
