<script lang="ts" setup>
import { VkDnd, VkDndItem } from '@vunk-x6/components/dnd'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
import { VkRegisterSenderNode } from '@vunk-x6/components/register-sender-node'
import { VkLlmAvatar } from '@vunk-x6/icons/llm'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { ref } from 'vue'

const collapseValue = ref(['Basic'])
</script>

<template>
  <VkDnd class="h-full home-page-dnd">
    <ElCollapse v-model="collapseValue">
      <ElCollapseItem name="Basic" title="基础组件">
        <VkDndItem :shape="VkRegisterLlmNode.name">
          <VkLlmAvatar></VkLlmAvatar>
          大模型
        </VkDndItem>

        <VkDndItem :shape="VkRegisterSenderNode.name">
          发送
        </VkDndItem>
      </ElCollapseItem>
    </ElCollapse>
  </VkDnd>
</template>

<style>
.home-page-dnd .el-collapse {
  --el-collapse-header-height: initial;
  --el-collapse-border-color: transparent;
  --el-collapse-header-font-size: initial;
  --el-collapse-content-font-size: initial;
}

.home-page-dnd .el-collapse-item__header {
  padding: var(--gap-s) 0 var(--gap-s) var(--gap-m);
  white-space: nowrap;
}

.home-page-dnd .vk-dnd-item {
  padding: var(--gap-xxs) 0 var(--gap-xxs) var(--gap-m);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.home-page-dnd .vk-dnd-item:hover {
  background-color: var(--el-color-primary-light-9);
}
.home-page-dnd .el-collapse-item__content {
  padding-bottom: var(--gap-s);
}
</style>
