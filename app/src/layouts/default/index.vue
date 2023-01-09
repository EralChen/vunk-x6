<script lang="ts" setup>
import AsideVue from '_c/LayoutAside/index.vue'
import HeaderVue from '_c/LayoutHeader/index.vue'
import { VkDuplexCalc } from '@vunk/core'
</script>
<template>
  <VkDuplexCalc class="layout-default">
    <template #one>
      <HeaderVue></HeaderVue>
    </template>
    <div sk-flex class="h-100%">
      <div class="layout-default-aside-x">
        <AsideVue></AsideVue>
      </div>
      <div class="flex-1">
        <ElScrollbar>
          <RouterView></RouterView>
        </ElScrollbar>

      </div>

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
</style>
<style>
.layout-default-aside-x, .layout-default {
  height: 100%;
}
.layout-default-main{
  width: 100%;
}
</style>