<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from '_c/MenuLink/index.vue'
import { routes as constRoutes } from '@/router'
import { computed, onMounted, ref, watch } from 'vue'
import { filterDeep } from 'deepdash-es/standalone'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { useViewsStore } from '@/stores/views'

const route = useRoute()
const permissionStore = usePermissionStore()
const viewsStore = useViewsStore()



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
const defaultHref = ref('')
onMounted(() => {
  watch(route, (v) => {
    const baseView = viewsStore.findBaseViewByFullpath(v.fullPath)


    if (baseView) {
     
      if (viewsStore.currentBaseView?.fullpath !== baseView.fullpath) {

        defaultHref.value = baseView.fullpath 

        viewsStore.setCurrentBaseView({
          ...baseView,
          children: baseView.meta?._children as RouteRecordRaw[],
          fullpath: baseView.fullpath,
        })

      }

    }
  },  { immediate: true })
})
/* set base view /> */


</script>
<template>

  <ElMenu 
    mode="horizontal"

    :backgroundColor="'transparent'"
    :defaultActive="defaultHref"
    
  >
    <VkRoutesMenuContent :data="navRoutes">
      <template #item="{ data, href }">
        <LinkVue :isMenu="false" :data="data" :to="href">
          <ElIcon v-if="data.meta?.icon"> 
            <component :is="data.meta.icon"></component>
          </ElIcon>
          {{  viewsStore.addBaseViewToRecord(href, data)  }}
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
          {{  viewsStore.addBaseViewToRecord(href, data)  }}
        </span> 

      </template>
      
    </VkRoutesMenuContent>
  </ElMenu>
</template>


