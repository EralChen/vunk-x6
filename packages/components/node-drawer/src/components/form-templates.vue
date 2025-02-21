<script lang="tsx" setup>
import { VkfFormItemRendererTemplate } from '@vunk/form'
import { __VkfCascader, VkfCascader } from '@vunk/form/components/cascader'
import VkfInputCollection from '@vunk/form/components/input-collection'
import { VkfTemplatesDefault } from '@vunk/form/components/templates-default'

const cascaderSlots = {
  default: ({ data }) => {
    return <span>{ data.label || data.name }</span>
  },
}
</script>

<template>
  <VkfTemplatesDefault />
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

  <VkfFormItemRendererTemplate type="VkfCascader">
    <template #default="{ props, input, value }">
      <VkfCascader
        v-bind="props"
        :model-value="value"
        :cascader-slots="cascaderSlots"
        @update:model-value="input"
      >
      </VkfCascader>
    </template>
  </VkfFormItemRendererTemplate>
</template>
