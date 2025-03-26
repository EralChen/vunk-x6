<script lang="tsx" setup>
import { __VkfCascader, VkfCascader } from '@vunk/form/components/cascader'
</script>

<template>
  <VkfCascader
    :show-all-levels="false"
    :props="{
      value: 'name',
      label: 'label',
    }"
  >
  </VkfCascader>
</template>
