<script lang="ts" setup>
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import Header from './header.vue'

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
    <template #header>
      <Header></Header>
    </template>
  </VkNodeDrawer>
</template>
