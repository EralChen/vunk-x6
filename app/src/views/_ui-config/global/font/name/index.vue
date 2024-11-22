<script lang="tsx" setup>
import type { __SkAppForm } from '@skzz/platform/components/app-form'
import type { namedFontSize } from '@skzz/platform/theme'
import { useThemeStore } from '@/stores/theme'
import { SkAppForm } from '@skzz/platform/components/app-form'
import { baseFontSizeOptions } from '@skzz/platform/theme'
import { setData } from '@vunk/core'

defineOptions({
  inheritAttrs: false,
})

const themeStore = useThemeStore()

const formItems: __SkAppForm.FormItem<keyof typeof namedFontSize>[] = [
  {
    templateType: 'VkfSelect',
    prop: '--f-module-title',
    label: 'f-module-title',
    allowCreate: true,
    filterable: true,
    clearable: true,
    options: baseFontSizeOptions,
  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        模块标题字体大小
      </p>
    ),
  },

  {
    templateType: 'VkfSelect',
    prop: '--f-card-title',
    label: 'f-card-title',
    allowCreate: true,
    filterable: true,
    clearable: true,
    options: baseFontSizeOptions,
  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        卡片标题字体大小
      </p>
    ),
  },

]
</script>

<template>
  <SkAppForm
    :label-width="110"
    :form-items="formItems"
    :data="themeStore.fontSizeNamedStyles"
    v-bind="$attrs"
    @set-data="setData(themeStore.fontSizeNamedStyles, $event)"
  >
  </SkAppForm>
</template>

<style>

</style>
