<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from './link.vue'
import { useLayoutStore } from '@/stores/layout'
import { Document } from '@element-plus/icons-vue'
import { onUnmounted } from 'vue'


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
  <ElMenu 
    class="layout-default-aside"
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
</template>
<style>
.layout-default-aside{
  height: 100%;
}
.layout-default-aside:not(.el-menu--collapse) {
  width: 200px;
}
</style>


