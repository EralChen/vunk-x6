<script lang="ts" setup>
import { VkStartAvatar } from '@vunk-x6/icons/start'

defineProps({
  label: {
    type: String,
    default: '开始',
  },
})
</script>

<template>
  <div class="vk-register-start-node__title">
    <VkStartAvatar
      :size="24"
      color="var(--el-color-success)"
    ></VkStartAvatar>
    <span>{{ label }}</span>
  </div>
</template>

<style>
.vk-register-start-node__title {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.vk-register-start-node__title .el-avatar {

  margin-right: 8px;
}
</style>
