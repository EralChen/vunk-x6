<script lang="ts">
import { Close } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VkNodeDrawerHeader',
  components: {
    Close,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
})
</script>

<template>
  <div class="vk-node-drawer-header">
    <div class="vk-node-drawer-header__top">
      <slot name="title">
        {{ title }}
      </slot>
      <div class="vk-node-drawer-header__actions">
        <slot name="actions" />
        <el-icon class="el-drawer__close" @click="$emit('close')">
          <Close />
        </el-icon>
      </div>
    </div>
    <div v-if="$slots.description" class="vk-node-drawer-header__description">
      <slot name="description" />
    </div>
  </div>
</template>

<style>
.vk-node-drawer-header {
  padding: var(--el-drawer-padding-primary);
  margin-bottom:0;
  border-bottom: 1px solid var(--el-border-color);
}

.vk-node-drawer-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.vk-node-drawer-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.el-drawer__close{
  cursor: pointer;
}

.vk-node-drawer-header__description {
  margin-top: 8px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
