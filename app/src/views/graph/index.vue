<script lang="ts" setup>
import type { Ref } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'
import { VkAppSidebarSegment } from '@vunk-x16/components/app-sidebar-segment'
import { VkAppTooltipButton } from '@vunk-x16/components/app-tooltip-button'
import { VkGraph } from '@vunk-x16/components/graph'
import { VkAsyncTeleport } from '@vunk/core'
import { ref } from 'vue'
import Dnd from './dnd.vue'
import Registers from './registers.vue'

const dndWrapper = ref() as Ref<HTMLDivElement>
</script>

<template>
  <VkGraph>
    <Registers></Registers>

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
  </VkGraph>
</template>
