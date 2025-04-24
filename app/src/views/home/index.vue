<script lang="ts" setup>
import { SplitGridSidebar } from '@/layouts/split-grid'
import { VkGraph } from '@vunk-x6/components/graph'
import Core from './core.vue'
import Dnd from './dnd.vue'
import Registers from './registers.vue'
import Topbar from './topbar.vue'
</script>

<template>
  <VkGraph>
    <!-- layout 侧边栏 -->
    <SplitGridSidebar>
      <Dnd />
    </SplitGridSidebar>

    <!-- 主视图 topbar -->
    <template #before>
      <Topbar />
    </template>

    <Registers></Registers>
    <Core></Core>
  </VkGraph>
</template>
