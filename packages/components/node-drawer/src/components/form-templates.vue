<script lang="tsx" setup>
import { VkfFormItemRendererTemplate } from '@vunk/form'
import { __VkfCascader } from '@vunk/form/components/cascader'
import VkfInputCollection from '@vunk/form/components/input-collection'
import { VkfTemplatesDefault } from '@vunk/form/components/templates-default'
import VkfCascader from './VkfCascader.vue'
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
    <template
      #default="{
        props, input, value,
        emitSetData,
      }"
    >
      <VkfCascader
        :model-value="value"
        :input="input"
        :emit-set-data="emitSetData"
        v-bind="props"
        @update:model-value="input"
      >
      </VkfCascader>
    </template>
  </VkfFormItemRendererTemplate>
</template>
