<script lang="ts" setup>
import { SkAppCard } from '@skzz-platform/components/app-card'
import ConfigForm from './ConfigForm.vue'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
import ThemeClipboardButton from '_c/ThemeClipboardButton/index.vue'
const themeStore = useThemeStore()

</script>
<template>
  <div class="h-main plr-page pb-page">
    <div class="bg-bg-overlay h-100%">
      <SkAppCard class="h-100%" :header="'顶部配置'">
        <template #header__options>
          <!-- <ThemeClipboardButton></ThemeClipboardButton> -->
        </template>
        <div class="ptb-form-ptb plr-form-pl">
          <ConfigForm
            :labelWidth="180"
            :data="themeStore.topMenuStyles"
            @setData="setData(themeStore.topMenuStyles, $event)"
          ></ConfigForm>

        </div>


      </SkAppCard>
    </div>
  </div>
</template>
