<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'

const defaultConfig = {
  '--el-menu-active-color': 'var(--el-color-primary)',
  '--el-menu-text-color': 'var(--el-text-color-primary)',
  '--el-menu-hover-text-color': 'var(--el-color-primary)',

  '--el-menu-bg-color': 'var(--el-fill-color-blank)',
  '--el-menu-hover-bg-color': 'var(--el-color-primary-light-9)',
  '--el-menu-item-height': '56px',
  '--el-menu-sub-item-height': 'calc(var(--el-menu-item-height) - 6px)',
  '--el-menu-horizontal-sub-item-height': '36px',
  '--el-menu-item-font-size': 'var(--el-font-size-base)',
  '--el-menu-item-hover-fill': 'var(--el-color-primary-light-9)',
  '--el-menu-border-color': 'var(--el-border-color)',
  '--el-menu-base-level-padding': '20px',
  '--el-menu-level-padding': '20px',
  '--el-menu-icon-width': '24px',
}

const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-active-color',
    label: 'Active Color',
  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-text-color',
    label: 'Text Color',

  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-hover-text-color',
    label: 'Hover Text Color',
  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-bg-color',
    label: 'Background Color',
  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-hover-bg-color',
    label: 'Hover Background Color',
  },
  {
    templateType: 'VkfInput',
    prop: '--el-menu-item-height',
    label: 'Item Height',
    placeholder: defaultConfig['--el-menu-item-height'],
  },
  {
    templateType: 'VkfInput',
    prop: '--el-menu-sub-item-height',
    label: 'Sub Item Height',
    placeholder: defaultConfig['--el-menu-sub-item-height'],
  },
  {
    templateType: 'VkfInput',
    prop: '--el-menu-horizontal-sub-item-height',
    label: 'Horizontal Sub Item Height',
    placeholder: defaultConfig['--el-menu-horizontal-sub-item-height'],
  },
  {
    templateType: 'VkfInput',
    prop: '--el-menu-item-font-size',
    label: 'Item Font Size',
    placeholder: defaultConfig['--el-menu-item-font-size'],
  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-item-hover-fill',
    label: 'Item Hover Fill',

  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-border-color',
    label: 'Border Color',

  },
  {
    templateType: 'VkfInput',
    prop: '--el-menu-base-level-padding',
    label: 'Base Level Padding',
    placeholder: defaultConfig['--el-menu-base-level-padding'],
  },
  {
    templateType: 'VkfInput',
    prop: '--el-menu-level-padding',
    label: 'Level Padding',
    placeholder: defaultConfig['--el-menu-level-padding'],
  },
  {
    templateType: 'VkfInput',
    prop: '--el-menu-icon-width',
    label: 'Icon Width',
    placeholder: defaultConfig['--el-menu-icon-width'],
  },


]
</script>
<template>
  <VkfForm :formItems="formItems"></VkfForm>
</template>
