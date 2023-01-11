<script lang="ts" setup>
import { VkDuplexCalc } from '@vunk/core'
import { defineAsyncComponent } from 'vue'
const LayoutHeader = defineAsyncComponent(() => import('_c/LayoutHeader/index.vue'))
const TagsView = defineAsyncComponent(() => import('_c/TagsView/index.vue'))
const LayoutAside = defineAsyncComponent(() => import('_c/LayoutAside/index.vue'))
</script>
<template>
  <VkDuplexCalc class="layout-default">
    <template #one>
      <LayoutHeader></LayoutHeader>
    </template>
    
    <div sk-flex class="h-100%">

      <div class="layout-default-aside-x">
        <LayoutAside></LayoutAside>
      </div>
    
      <VkDuplexCalc class="flex-1">
        <template #one>
          <TagsView></TagsView>
        </template>

        <ElScrollbar>
          <RouterView></RouterView>
        </ElScrollbar>
      </VkDuplexCalc>

    </div>
  </VkDuplexCalc>
</template>
<style>
.layout-default {
  --layout-aside-width: 250px;
}
.layout-default > .vk-duplex-calc-two{
  background-color: var(--el-fill-color);
}
.layout-default .el-scrollbar__view{
  content-visibility: auto;
} 
</style>
<style>
.layout-default-aside-x, .layout-default {
  height: 100%;
}
.layout-default-main{
  width: 100%;
}
</style>