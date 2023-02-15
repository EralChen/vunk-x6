<script lang="ts" setup>
import { VkDuplexCalc } from '@vunk/core'
import { defineAsyncComponent, ref } from 'vue'

const LayoutHeader = defineAsyncComponent(() => import('_c/LayoutTop/index.vue'))
const TagsView = defineAsyncComponent(() => import('_c/TagsView/index.vue'))
const LayoutAside = defineAsyncComponent(() => import('_c/LayoutAside/index.vue'))
const BreadcrumbVue = defineAsyncComponent(() => import('_c/Breadcrumb/index.vue'))

const headerReady = ref(false)
const asideReady = ref(false)

</script>
<template>
  <VkDuplexCalc class="layout-default">
    <template #one>
      <LayoutHeader
        @load="headerReady = true"
      ></LayoutHeader>
    </template>




      <div sk-flex class="h-100%">
        <div class="layout-default-aside-x">
          <LayoutAside v-if="headerReady"
            @load="asideReady = true"
          ></LayoutAside>
        </div>

        <VkDuplexCalc class="flex-1 overflow-hidden" :heightProperty="'--zz-page-height'"
          v-if="asideReady"
        >
          <template #one>
            <TagsView></TagsView>
            <BreadcrumbVue></BreadcrumbVue>
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

.layout-default>.vk-duplex-calc-two {
  background-color: var(--el-fill-color);
}

.layout-default .el-scrollbar__view {
  content-visibility: auto;
}
</style>


<style>
.layout-default-aside-x,
.layout-default {
  height: 100%;

}

.layout-default-main {
  width: 100%;
}
</style>