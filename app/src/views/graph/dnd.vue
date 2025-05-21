<script lang="ts" setup>
import { useRouterTo } from '@skzz/platform/composables'
import { VkDnd, VkDndItem } from '@vunk-x16/components/dnd'
import { VkRegisterLlmNode } from '@vunk-x16/components/register-llm-node'
import { VkRegisterSenderNode } from '@vunk-x16/components/register-sender-node'
import { VkLlmAvatar } from '@vunk-x16/icons/llm'
import { VkMindAvatar } from '@vunk-x16/icons/mind'
import { VkSendAvatar } from '@vunk-x16/icons/send'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { ref } from 'vue'

const { routerNext } = useRouterTo()
const collapseValue = ref(['Basic', 'NPC'])

function goMemory () {
  routerNext({
    path: 'memory',
    mode: 'push',
  })
}
</script>

<template>
  <VkDnd class="h-full home-page-dnd">
    <ElCollapse v-model="collapseValue">
      <ElCollapseItem name="Basic" title="基础组件">
        <VkDndItem
          :shape="VkRegisterLlmNode.name"
        >
          <VkLlmAvatar></VkLlmAvatar>
          大模型
        </VkDndItem>

        <VkDndItem :shape="VkRegisterSenderNode.name">
          <VkSendAvatar></VkSendAvatar>
          发送
        </VkDndItem>
      </ElCollapseItem>

      <ElCollapseItem name="NPC" title="NPC">
        <VkDndItem sk-flex="row-between">
          <el-text>
            Alex
          </el-text>
          <VkMindAvatar
            class="cursor-pointer"
            @click="goMemory"
          ></VkMindAvatar>
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

.home-page-dnd .vk-dnd-item .el-avatar--icon:hover {
  color: var(--el-color-primary)!important;
}

.home-page-dnd .el-collapse-item__content {
  padding-bottom: var(--gap-s);
}
</style>
