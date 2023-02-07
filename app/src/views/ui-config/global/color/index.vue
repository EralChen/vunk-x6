<script lang="ts" setup>
import BaseVue from './base.vue'
import BgVue from './bg.vue'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const labelWidth = 80
const themeStore = useThemeStore()

</script>
<template>
  <div plr-page pb-page class="h-main">
    <div class="bg-bg-overlay">

      <SkAppCard :title="'基础颜色'">
        <BaseVue 
          :labelWidth="labelWidth"
          :data="themeStore.colorStyles"
          @setData="setData(themeStore.colorStyles, $event)"
        />
      </SkAppCard>


      <SkAppCard :title="'背景颜色'">
        <BgVue
          :labelWidth="labelWidth"
          :data="themeStore.colorStyles"
          @setData="setData(themeStore.colorStyles, $event)"
        ></BgVue>
      </SkAppCard>

    </div>

  </div>

</template>
