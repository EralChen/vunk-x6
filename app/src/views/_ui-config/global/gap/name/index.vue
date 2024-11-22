<script lang="tsx" setup>
import type { __SkAppForm } from '@skzz/platform/components/app-form'
import type { namedGap } from '@skzz/platform/theme'
import { useThemeStore } from '@/stores/theme'
import { SkAppForm } from '@skzz/platform/components/app-form'
import { baseGapOptions } from '@skzz/platform/theme'
import { setData } from '@vunk/core'

defineOptions({
  inheritAttrs: false,
})

const themeStore = useThemeStore()

const formItems: __SkAppForm.FormItem<keyof typeof namedGap>[] = [
  {
    templateType: 'VkfSelect',
    prop: '--gap-page',
    label: 'gap-page',
    options: baseGapOptions,

  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        页面间距: 系统页面主体的间距， 如：页面主体周围的间距
      </p>
    ),
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-main-pt',
    label: 'gap-main-pt',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        主体上下间距: 主体上下的间距。如：卡片body的上下间距
      </p>
    ),
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-form-pl',
    label: 'gap-form-pl',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        表单左间距: 表单左侧的间距
      </p>
    ),
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-form-pt',
    label: 'gap-form-pt',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        表单上下间距: 表单上下的间距
      </p>
    ),
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-tab-pt',
    label: 'gap-tab-pt',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        页签上下间距: 页签上下的间距
      </p>
    ),
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-tab-space',
    label: 'gap-tab-space',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },

  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        页签间距: 页签之间的间距
      </p>
    ),
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-widget-space',
    label: 'gap-widget-space',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => (
      <p class="text-text-secondary mb-xl">
        小部件间距: 小部件之间的间距。如button、tag 等
      </p>
    ),
  },

]
</script>

<template>
  <SkAppForm
    :label-width="200"

    :form-items="formItems"
    :data="themeStore.gapNamedStyles"
    v-bind="$attrs"
    @set-data="setData(themeStore.gapNamedStyles, $event)"
  >
  </SkAppForm>
</template>

<style>

</style>
