<script lang="ts" setup>
import { VkAvatar } from '@vunk/plus/components/avatar'
import { ElTooltip } from 'element-plus'
import { props as dProps, emits } from './ctx'

defineOptions({
  name: 'VkAppTooltipButton',
})

defineProps(dProps)
defineEmits(emits)
</script>

<template>
  <ElTooltip
    :content="tooltipContent"
    :show-after="600"
  >
    <VkAvatar
      :icon="icon"
      v-bind="$attrs"
    ></VkAvatar>
  </ElTooltip>
</template>
