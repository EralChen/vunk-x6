<script lang="ts" setup>
import type { __VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import { setData } from '@vunk/core'

import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'

import DrawerForm from './drawer-form.vue'
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

    <template #default="{ data, node }">
      <DrawerForm
        :data="data"
        :node="node"
        @set-data="setData(data, $event)"
      >
      </DrawerForm>
    </template>
  </VkNodeDrawer>
</template>
