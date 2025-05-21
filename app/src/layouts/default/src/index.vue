<script lang="ts" setup>
import SplitGrid from '@/components/SplitGrid.vue'
import { VkSegmentRenderer } from '@vunk/core/components/segment-renderer'

import { ref } from 'vue'
</script>

<template>
  <VkSegmentRenderer>
    <SplitGrid>
      <template #sidebar>
      </template>
      <template #main>
        <RouterView></RouterView>
      </template>
    </SplitGrid>
  </VkSegmentRenderer>
</template>
