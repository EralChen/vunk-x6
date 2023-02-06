<script lang="ts" setup>
import BaseVue from './base.vue'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const themeStore = useThemeStore()

</script>
<template>
  <div plr-page pb-page class="h-main">
    <div class="bg-bg-overlay">
      <SkAppCard :title="'基础颜色'">
        <BaseVue 
          :data="themeStore.colorStyles"
          @setData="setData(themeStore.colorStyles, $event)"
        />
      </SkAppCard>


    </div>

  

  </div>

</template>
