<script lang="ts" setup>
import { VkDnd, VkDndItem } from '@vunk-x6/components/dnd'
import { VkRegisterLlmNode } from '@vunk-x6/components/register-llm-node'
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
      </ElCollapseItem>
    </ElCollapse>
  </VkDnd>
</template>

<style>
.home-page-dnd .el-collapse-item__header {
  padding-left: var(--gap-m);
  white-space: nowrap;
}

.home-page-dnd .vk-dnd-item {
  padding-left: var(--gap-m);
  padding-top: var(--gap-xxs);
  padding-bottom: var(--gap-xxs);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.home-page-dnd .vk-dnd-item:hover {
  background-color: var(--el-color-primary-light-9);
}
.home-page-dnd .el-collapse-item__content {
  padding-bottom: var(--gap-m);
}
</style>
