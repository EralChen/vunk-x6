<script lang="ts" setup>
import { VkSplitGrid } from '@vunk/core/components/split-grid'
</script>

<template>
  <VkSplitGrid grid-template-columns="0.3fr 8px 1fr">
    <template #default="{ getGutterProps }">
      <div
        h-full
        overflow-hidden
      >
        <slot name="sidebar"></slot>
      </div>
      <div v-bind="getGutterProps('column', 1)"></div>
      <div w-full h-full overflow-hidden transform-gpu pos-relative>
        <slot name="main"></slot>
      </div>
    </template>
  </VkSplitGrid>
</template>
