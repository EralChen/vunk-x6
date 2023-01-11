<script lang="ts" setup>
import { useViewsStore } from '@/stores/views'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const viewsStore = useViewsStore()

/* vue3 监听路由变化 */
watch(route, (newRoute) => {
  viewsStore.addVisitedView({...newRoute})
}, { immediate: true })


</script>
<template>
  <div sk-flex class="bg-bg-overlay">
    <RouterLink 
      v-for="item of viewsStore.visitedViews" 
      :key="item.fullPath" 
      :to="item.fullPath"
      class="decoration-none text-text-secondary block pa-m tags-view-item"
    >
      <span>{{  item.meta.title || '未命名'  }}</span>    
    </RouterLink>

  </div>


</template>

<style>
.tags-view-item.router-link-exact-active{
  color: var(--el-color-primary);
}
</style>
