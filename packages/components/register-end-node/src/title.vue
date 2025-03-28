<script lang="ts" setup>
import { VkEndAvatar } from '@vunk-x6/icons/end'

defineProps({
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="vk-register-end-node-title">
    <VkEndAvatar
      :size="24"
      color="var(--el-color-success)"
    ></VkEndAvatar>
    <span>{{ label }}</span>
  </div>
</template>

<style>
.vk-register-end-node-title {
  display: flex;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
}

.vk-register-end-node-title .el-avatar {
  margin-right: 8px;
}
</style>
