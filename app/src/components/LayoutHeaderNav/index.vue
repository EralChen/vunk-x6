<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from '_c/MenuLink/index.vue'
import { routes as constRoutes } from '@/router'
import { computed, onMounted, shallowReactive } from 'vue'
import { filterDeep } from 'deepdash-es/standalone'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { useViewsStore } from '@/stores/views'

const route = useRoute()
const permissionStore = usePermissionStore()
const viewsStore = useViewsStore()

const navRouteInfo = shallowReactive<Record<string, RouteRecordRaw>>({})
const setNavRouteInfo = (href: string, v: RouteRecordRaw) => {
  navRouteInfo[href] = v
  return ''
}

const navRoutes = computed(() => {
  return filterDeep([...permissionStore.routes, ...constRoutes], (v) => {
    if (v.meta?.header) {
      // 暂存原始 children
      v.meta._children = [...v.children]
      return true
    }
  }, {
    childrenPath: ['children'],
  })
})

/* set base view */
onMounted(() => {
  // 从 navRouteInfo 的 keys 中, 获取与 route.path 前面相同的 最长的 key
  const keys = Object.keys(navRouteInfo)
  // 最长的 key
  let key = ''
  keys.forEach((k) => {
    if (route.path.startsWith(k) && k.length > key.length) {
      key = k
    }
  })
  
  if (key) {
    const baseView = navRouteInfo[key]
    viewsStore.setBaseView({
      ...baseView,
      children: baseView.meta?._children as RouteRecordRaw[],
      href: key,
    })
  }

})
const menuSelect = (index: string) => {
  
  const baseView = navRouteInfo[index]
  viewsStore.setBaseView({
    ...baseView,
    children: baseView.meta?._children as RouteRecordRaw[],
    href: index,
  })
}
/* set base view /> */


</script>
<template>
  <!-- 
      :textColor="'var(--el-color-white)'"
    :activeTextColor="'var(--el-color-white)'"
   -->
  <ElMenu 
    mode="horizontal"
    @select="menuSelect"
    :backgroundColor="'transparent'"
  >
    <VkRoutesMenuContent :data="navRoutes">
      <template #item="{ data, href }">
        <LinkVue :isMenu="false" :data="data" :to="href">
          <ElIcon v-if="data.meta?.icon"> 
            <component :is="data.meta.icon"></component>
          </ElIcon>
          {{ setNavRouteInfo(href, data) }}
        </LinkVue>
      </template>

      <template #itemTitle="{ data }">
        <span>{{ data.meta?.title || data.meta?.name }}</span> 
      </template>

      <template #menuTitle="{ data, href }">
        <LinkVue :isMenu="true" :data="data" :to="href">
          <ElIcon v-if="data.meta?.icon"> 
            <component :is="data.meta.icon"></component>
          </ElIcon>
        </LinkVue>

        <span> 
          {{ data.meta?.title || data.meta?.name }} 
          {{ setNavRouteInfo(href, data) }}
        </span> 

      </template>
      
    </VkRoutesMenuContent>
  </ElMenu>
</template>


