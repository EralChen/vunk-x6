<script lang="ts" setup>
import { useViewsStore } from '@/stores/views'
import { Close } from '@element-plus/icons-vue'
import { AnyFunc } from '@vunk/core'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const viewsStore = useViewsStore()

/* vue3 监听路由变化 */
watch(route, (newRoute) => {
  if (
    newRoute.meta?.title
    && newRoute.meta?.tagsView !== false
  ) {
    viewsStore.addVisitedView({ ...newRoute })
  }
  
}, { immediate: true })

const linkClose = (e: MouseEvent, fullPath: string) => {
  e.preventDefault()
  e.stopPropagation()
  const { item, index } = viewsStore.delVisitedViewByFullpath(fullPath)
  if (item) {
    if (item.fullPath === route.fullPath) { // 将要关闭的路由是当前路由
      // 将路由跳转到 该路由的上一个路由
      const prevItem = viewsStore.visitedViews[index - 1]
      if (prevItem) {
        router.push(prevItem.fullPath)
      } else {
        // 如果没有上一个路由，跳转到后面的路由
        const nextItem = viewsStore.visitedViews[index]
        if (nextItem) {
          router.push(nextItem.fullPath)
        } else {
          // 如果没有后面的路由，跳转到首页
          router.push('/')
        }

      }
    }
  }
}
const linkClick = (e: MouseEvent, navigate: AnyFunc) => {
  e.preventDefault()
  navigate()
}
</script>
<template>
  <ElScrollbar class="bg-bg-overlay tags-view" >
    <div sk-flex >

      <RouterLink 
      v-for="item of viewsStore.visitedViews"
      :key="item.fullPath" :to="item.fullPath"
       :custom="true"
       >
        <template #default="{ navigate, href, isActive, isExactActive }">
          <a draggable="false" :href="href" @click="linkClick($event, navigate)" class="decoration-none text-text-secondary ptb-s plr-m 
           tags-view-item" sk-flex="row-around-center" :class="{
             'router-link-active': isActive,
             'router-link-exact-active': isExactActive
           }" sub:ml-xxs>
            <span>{{ item.meta.title || '未命名' }}</span>

            <span sk-flex="row_center" @click="linkClose($event, item.fullPath)">
              <ElIcon class="tags-view-icon-close" hover="bg-fill-darker">
                <Close />
              </ElIcon>
            </span>

          </a>

        </template>

      </RouterLink>




    </div>
  </ElScrollbar>
</template>
<style scoped>
.tags-view{
  overflow: initial;
}
.tags-view :deep(.el-scrollbar__bar.is-horizontal){
  margin-bottom: -8px;
}
</style>
<style>

.tags-view-item {
  flex-shrink: 0;
  width: 130px;
}

.tags-view-icon-close {
  visibility: hidden;
}

.tags-view-item:hover .tags-view-icon-close {
  visibility: initial;
}

.tags-view-item:hover {
  color: var(--el-color-primary);
}


.tags-view-item.router-link-exact-active {
  color: var(--el-color-primary);
  font-weight: bold;
}

.tags-view-item.router-link-exact-active .tags-view-icon-close {
  color: var(--el-text-color-secondary);
  visibility: initial;
}

.tags-view-item.router-link-exact-active .tags-view-icon-close:hover {
  color: var(--el-text-color-secondary);
}

.tags-view-icon-close {
  box-sizing: content-box;
  padding: 2px;
  border-radius: 50%;

}
</style>
