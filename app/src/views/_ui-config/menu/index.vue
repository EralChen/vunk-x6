<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { setData } from '@vunk/core'
import MenuFormVue from './MenuForm.vue'
const themeStore = useThemeStore()

</script>
<template>
  <div plr-page pb-page class="h-main">
    <SkAppCard class="h-100%" :header="'ElementPlus 菜单'">
      <div plr-form-pl ptb-form-ptb>
        <MenuFormVue
          :data="themeStore.menuStyles"
          @setData="setData(themeStore.menuStyles, $event)"
        ></MenuFormVue>
      </div>
   
    </SkAppCard>
  </div>

</template>
