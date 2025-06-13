<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { __VkGraph } from '@vunk-x16/components/graph'
import type { Ref } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'
import { useAppSidebarSegmentViewContext, VkAppSidebarSegment } from '@vunk-x16/components/app-sidebar-segment'
import { VkAppTooltipButton } from '@vunk-x16/components/app-tooltip-button'
import { VkGraph } from '@vunk-x16/components/graph'
import { VkAsyncTeleport } from '@vunk/core'
import { onMounted, ref } from 'vue'
import Dnd from './dnd.vue'
import Registers from './registers.vue'

const { attrs } = useAppSidebarSegmentViewContext()

const dndWrapper = ref() as Ref<HTMLDivElement>

onMounted(() => {
  attrs['sidebar-props'].tabsModelValue || (
    attrs['sidebar-props'].tabsModelValue = 'Explorer'
  )
})
</script>

<template>
  <VkGraph>
    <VkAppSidebarSegment name="Explorer">
      <template #label>
        <VkAppTooltipButton
          tooltip-content="Explorer"
          :icon="DocumentCopy"
        >
        </VkAppTooltipButton>
      </template>
      <div ref="dndWrapper"></div>
    </VkAppSidebarSegment>

    <VkAsyncTeleport
      :to="dndWrapper"
    >
      <Dnd></Dnd>
    </VkAsyncTeleport>

    <Registers></Registers>

    <template #before>
      <RouterView></RouterView>
    </template>
  </VkGraph>
</template>
