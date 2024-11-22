<script lang="ts" setup>
import type { SetDataEvent } from '@vunk/core'
import ThemeClipboardButton from '@/components/ThemeClipboardButton/index.vue'
import { useThemeStore } from '@/stores/theme'
import { SkAppCard, SkAppModule } from '@skzz/platform'
import { setData } from '@vunk/core'
import PageX from '_c/PageX/index.vue'
import { computed } from 'vue'
import BaseVue from './base.vue'
import BgVue from './bg.vue'

const themeStore = useThemeStore()

const formVueProps = computed(() => {
  return {
    labelWidth: 150,
    formItemBasis: '250px',
    data: themeStore.colorStyles,
    onSetData: (event: SetDataEvent) => {
      setData(themeStore.colorStyles, event)
    },
  }
})
</script>

<template>
  <PageX>
    <SkAppCard
      class="h-100%"
      header="ElementPlus 颜色"
    >
      <template #header__options>
        <ThemeClipboardButton target="colorStyles"></ThemeClipboardButton>
      </template>

      <ElScrollbar>
        <SkAppModule title="基础颜色">
          <BaseVue v-bind="formVueProps" />
        </SkAppModule>
        <SkAppModule title="背景颜色">
          <BgVue v-bind="formVueProps"></BgVue>
        </SkAppModule>
      </ElScrollbar>
    </SkAppCard>
  </PageX>
</template>
