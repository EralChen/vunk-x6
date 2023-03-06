<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from '_c/MenuLink/index.vue'
import { useLayoutStore } from '@/stores/layout'
import { Document } from '@element-plus/icons-vue'
import { nextTick, onMounted, Ref, ref, watch } from 'vue'
import CollapseVue from './Collapse.vue'
import { useViewsStore } from '@/stores/views'
import { usePermissionStore } from '@/stores/permission'
import { routes as constRoutes } from '@/router'
import { AnyFunc } from '@vunk/core'
import { useRoute } from 'vue-router'
import { useSharedMenuClick } from '@/composables'

const emit = defineEmits({
  'load': null,
})

const viewsStore = useViewsStore()
const layoutStore = useLayoutStore()
const permissionStore = usePermissionStore()
const route = useRoute()
const menuNode = ref() as Ref<{ open: AnyFunc }>
useSharedMenuClick()

const initOpenMenu = () => {
  const testIndex = route.matched.map(item => item.path)
  for (let i = 0; i < testIndex.length; i++) {
    const index = testIndex[i]
    try {
      menuNode.value.open(index)
      break
    } catch {
      continue
    }
       
  }
}

onMounted(async () => {
  watch(() => viewsStore.currentBaseView, async () => {
    await nextTick()
    initOpenMenu()
  }, { immediate: true })
  emit('load')
})
</script>
<template>
<div class="layout-default-aside h-100%" >
  <ElScrollbar>
    <ElMenu 
      class="layout-default-aside-menu"
      :collapse="layoutStore.asideInfo.menuCollapse"
      ref="menuNode"
    >
      <VkRoutesMenuContent 
        :data="viewsStore.currentBaseView?.children || [...permissionStore.routes, ...constRoutes]" 
        :basePath="viewsStore.currentBaseView?.fullPath || ''"
        :popperClass="'layout-default-aside-popper'"
      >
        <template #item="{ data, href }">
          <LinkVue :isMenu="false" :data="data" :to="href">
            <ElIcon class="layout-default-aside-item-icon"><Document></Document></ElIcon>
          
          </LinkVue>
        </template>

        <template #itemTitle="{ data }">
          <span >{{ data.meta?.title || data.meta?.name }}</span> 
        </template>

        <template #menuTitle="{ data, href }">
 
          <LinkVue :isMenu="true" :data="data" :to="href">
            <ElIcon class="layout-default-aside-item-icon"><Document></Document></ElIcon>
          </LinkVue>

          <span class="layout-default-aside-item-span"> {{ data.meta?.title || data.meta?.name }}</span> 


        </template>
      </VkRoutesMenuContent>
    </ElMenu>
  
  </ElScrollbar>

  <CollapseVue class="layout-default-aside-collapse"></CollapseVue>
</div>
</template>

<slyle lang="scss">
.layout-default-aside-menu[style*="--el-menu-level:0"] > li{
  font-weight: bold;
}
.layout-default-aside-menu[style*="--el-menu-level:0"] > li > ul{
  font-weight: initial;
}
</slyle>

<style>
.layout-default-aside-collapse{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
  cursor: pointer;
  z-index: 2;
}
.layout-default-aside{
  position: relative;
}

.layout-default-aside-menu:not(.el-menu--collapse) {
  width: var(--layout-aside-width);
}
.layout-default-aside-menu {
  min-height: var(--vk-duplex-calc-resize-height);
}
.layout-default-aside-item-icon{
  margin-bottom: .2em;
}
</style>

<style>
.layout-default-aside:hover .layout-default-aside-collapse{
  opacity: 1;
}
.layout-default-aside-collapse{
  opacity: 0;
  transition: opacity 3s cubic-bezier(.15,.84,0,1.06);
}
</style>


