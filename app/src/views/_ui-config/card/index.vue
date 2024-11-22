<script lang="ts" setup>
import type { __SkAppForm } from '@skzz/platform'
import type { elCardTheme } from '@skzz/platform/theme'
import { useThemeStore } from '@/stores/theme'
import { SkAppCard, SkAppForm } from '@skzz/platform'
import { baseGapOptions } from '@skzz/platform/theme'
import { setData } from '@vunk/core'
import PageX from '_c/PageX/index.vue'

const themeStore = useThemeStore()
const formItems: __SkAppForm.CoreFormItem<keyof typeof elCardTheme>[] = [
  {
    templateType: 'SkCssColorPicker',
    prop: '--el-card-bg-color',
    label: '背景色',
  },
  {
    templateType: 'SkCssColorPicker',
    prop: '--el-card-border-color',
    label: '边框颜色',
  },
  {
    templateType: 'VkfInput',
    prop: '--el-card-border-radius',
    label: '边框圆角',
  },
  {
    templateType: 'VkfSelect',
    prop: '--el-card-padding',
    label: '内边距',
    options: baseGapOptions,
    allowCreate: true,
    filterable: true,
  },
]
</script>

<template>
  <PageX>
    <SkAppCard
      class="h-100%"
      header="卡片配置"
    >
      <SkAppForm
        :label-width="100"
        class="plr-form-pl ptb-form-pt"
        :form-items="formItems"
        :data="themeStore.cardStyles"
        @set-data="setData(themeStore.cardStyles, $event)"
      ></SkAppForm>
    </SkAppCard>
  </PageX>
</template>
