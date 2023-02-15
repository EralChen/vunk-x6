<script lang="ts" setup>
import { useThemeStore } from '@skzz-platform/stores/theme'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { setData } from '@vunk/core'
import ElMenuConfigForm from '_c/ElMenuConfigForm/index.vue'
const themeStore = useThemeStore()

</script>
<template>
  <div plr-page pb-page class="h-page">
    <SkAppCard class="h-100%" :header="'菜单配置'">
      <div plr-form-pl ptb-form-ptb>
        <ElMenuConfigForm
          :data="themeStore.menuStyles"
          @setData="setData(themeStore.menuStyles, $event)"
        ></ElMenuConfigForm>
      </div>
   
    </SkAppCard>
  </div>

</template>
