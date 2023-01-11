<script lang="ts" setup>
import { useViewsStore } from '@/stores/views'
import { Close } from '@element-plus/icons-vue'
import { AnyFunc } from '@vunk/core'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const viewsStore = useViewsStore()

/* vue3 监听路由变化 */
watch(route, (newRoute) => {
  viewsStore.addVisitedView({ ...newRoute })
}, { immediate: true })

const linkClose = (e: MouseEvent, fullPath: string) => {
  e.preventDefault()
  e.stopPropagation()
  viewsStore.delVisitedViewByFullpath(route.fullPath)
}
const linkClick = (e: MouseEvent, navigate: AnyFunc) => {
  e.preventDefault()
  navigate()
}
</script>
<template>
  <div sk-flex class="bg-bg-overlay">

    <RouterLink 
      v-for="item of viewsStore.visitedViews" 
      :key="item.fullPath" :to="item.fullPath"
      :custom="true"
    >
      <template #default="{ navigate, href,  isActive, isExactActive  }">
        <a 
          :href="href" 
          @click="linkClick($event, navigate)"
          class="decoration-none text-text-secondary pa-m tags-view-item" 
          sk-flex="row_center" 
          :class="{
            'router-link-active': isActive,
            'router-link-exact-active': isExactActive
          }"
          sub:ml-m
        >
          <span>{{ item.meta.title || '未命名' }}</span>

          <span sk-flex="row_center"  @click="linkClose($event, item.fullPath)" >
            <ElIcon 
              class="tags-view-icon-close" 
              hover="bg-fill-darker"
            >
              <Close  />
            </ElIcon>
          </span>

        </a>
      
      </template>

    </RouterLink>



  </div>


</template>

<style>
.tags-view-item.router-link-exact-active {
  color: var(--el-color-primary);
}
.tags-view-icon-close{
  box-sizing: content-box;
  padding: 2px;
  border-radius: 50%;

}
</style>
