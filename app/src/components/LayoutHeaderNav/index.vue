<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from '_c/MenuLink/index.vue'
import { useLayoutStore } from '@/stores/layout'

import { routes as constRoutes } from '@/router'
import { computed } from 'vue'

const permissionStore = usePermissionStore()
const navRoutes = computed(() => {
  return [...permissionStore.routes, ...constRoutes].map(item => {
    return {
      ...item,
      children: [],
    }
  })
})

const layoutStore = useLayoutStore()
const menuSelect = (index: string, indexPath: string[]) => {
  console.log(index, indexPath)
}

</script>
<template>
  <ElMenu 
    mode="horizontal"
    @select="menuSelect"
  >
    <VkRoutesMenuContent :data="navRoutes" :popperClass="'layout-default-aside-popper'">
      <template #item="{ data, href }">
        <LinkVue :isMenu="false" :data="data" :to="href">
          <ElIcon class="layout-default-aside-item-icon" v-if="data.meta?.icon"> 
            <!-- <component :is="IconComponents[data.meta.icon]"></component> -->
          </ElIcon>
        
        </LinkVue>
      </template>

      <template #itemTitle="{ data }">
        <span>{{ data.meta?.title || data.meta?.name }}</span> 
      </template>

      <template #menuTitle="{ data, href }">
        <LinkVue :isMenu="true" :data="data" :to="href">
          <ElIcon class="layout-default-aside-item-icon" v-if="data.meta?.icon"> 
            <!-- <component :is="IconComponents[data.meta.icon]"></component> -->
          </ElIcon>
        </LinkVue>

        <span>{{ data.meta?.title || data.meta?.name }}</span> 

      </template>

    </VkRoutesMenuContent>
  </ElMenu>
</template>


