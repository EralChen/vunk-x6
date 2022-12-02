<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from './link.vue'
import { useLayoutStore } from '@/stores/layout'
import { Document } from '@element-plus/icons-vue'
import { onUnmounted } from 'vue'
import CollapseVue from './Collapse.vue'


const permissionStore = usePermissionStore()
const layoutStore = useLayoutStore()


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
<div class="layout-default-aside">

  <ElMenu 
    class="layout-default-aside-menu"
    :collapse="layoutStore.asideInfo.menuCollapse"
  >
    <VkRoutesMenuContent :data="permissionStore.routes" :popperClass="'layout-default-aside-popper'">
      <template #item="{ data }">
        <LinkVue :isMenu="false" :data="data">
          <ElIcon class="layout-default-aside-item-icon"><Document></Document></ElIcon>
        </LinkVue>
      </template>

      <template #itemTitle="{ data }">
        <span>{{ data.meta?.name }}</span> 
      </template>

      <template #menuTitle="{ data }">
        <LinkVue :isMenu="true" :data="data">
          <ElIcon class="layout-default-aside-item-icon"><Document></Document></ElIcon>
        </LinkVue>

        <span>{{ data.meta?.name }}</span> 

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
}
.layout-default-aside{
  position: relative;
}

.layout-default-aside-menu:not(.el-menu--collapse) {
  width: 200px;
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
