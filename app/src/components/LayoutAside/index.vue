<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from '_c/MenuLink/index.vue'
import { useLayoutStore } from '@/stores/layout'
import { Document } from '@element-plus/icons-vue'
import { onUnmounted } from 'vue'
import CollapseVue from './Collapse.vue'
import { useViewsStore } from '@/stores/views'
import { usePermissionStore } from '@/stores/permission'
import { routes as constRoutes } from '@/router'

const viewsStore = useViewsStore()
const layoutStore = useLayoutStore()
const permissionStore = usePermissionStore()


document.addEventListener('click', upLinkClickToItem)
onUnmounted(() => {
  document.removeEventListener('click', upLinkClickToItem)
})

function upLinkClickToItem (e: MouseEvent) {
  const path = e.composedPath()
  const elMenuItem = path.find((item) => {
    return item instanceof Element && item.classList.contains('el-menu-item')
  }) as HTMLElement

  if (elMenuItem) {
    elMenuItem.getElementsByTagName('a')[0]?.click()                 
  }
}
</script>
<template>
<div class="layout-default-aside" >

  <ElMenu 
    class="layout-default-aside-menu"
    :collapse="layoutStore.asideInfo.menuCollapse"
  >
    <VkRoutesMenuContent 
    :data="viewsStore.currentBaseView?.children || [...permissionStore.routes, ...constRoutes]" 
    :basePath="viewsStore.currentBaseView?.fullpath || ''"
    :popperClass="'layout-default-aside-popper'">
      <template #item="{ data, href }">
        <LinkVue :isMenu="false" :data="data" :to="href">
          <ElIcon class="layout-default-aside-item-icon"><Document></Document></ElIcon>
        
        </LinkVue>
      </template>

      <template #itemTitle="{ data }">
        <span>{{ data.meta?.title || data.meta?.name }}</span> 
      </template>

      <template #menuTitle="{ data, href }">
        <LinkVue :isMenu="true" :data="data" :to="href">
          <ElIcon class="layout-default-aside-item-icon"><Document></Document></ElIcon>
        </LinkVue>

        <span>{{ data.meta?.title || data.meta?.name }}</span> 

      </template>

    </VkRoutesMenuContent>
  </ElMenu>
  
  <CollapseVue class="layout-default-aside-collapse"></CollapseVue>
</div>
</template>

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

<style>
.layout-default-aside-menu, .layout-default-aside{
  height: 100%;
}
</style>
