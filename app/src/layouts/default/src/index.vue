<script lang="ts" setup>
import SplitGrid from '@/components/SplitGrid.vue'
import { VkAppSidebarSegmentRenderer, VkAppSidebarSegmentView } from '@vunk-x16/components/app-sidebar-segment'
import { ElTabPane, ElTabs } from 'element-plus'
</script>

<template>
  <VkAppSidebarSegmentRenderer>
    <SplitGrid>
      <template #sidebar>
        <VkAppSidebarSegmentView>
          <template #default="{ items }">
            <ElTabs h-full class="layout-sidebar-tabs">
              <ElTabPane
                v-for="item in items"
                :key="item.attrs.name"
                :name="item.attrs.name"
              >
                <template #label>
                  <component :is="item.slots.label" />
                </template>
                <div gpl-m gptb-s f-s>
                  <span text-text-secondary>{{ item.attrs.name }}</span>
                  <div>
                    <component :is="item.slots.actions"></component>
                  </div>
                </div>
                <component :is="item.slots.default" />
              </ElTabPane>
            </ElTabs>
          </template>
        </VkAppSidebarSegmentView>
      </template>

      <template #main>
        <RouterView></RouterView>
      </template>
    </SplitGrid>
  </VkAppSidebarSegmentRenderer>
</template>

<style>
.layout-sidebar-tabs .el-tabs__header{
  margin: 0;
}
</style>
