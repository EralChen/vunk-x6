<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { layoutTopTheme } from '@skzz-platform/theme'

const formItems: FormItemRendererSource<keyof typeof layoutTopTheme>[] = [
  {
    templateType: 'VkfInput',
    prop: '--layout-top-bg',
    label: '--layout-top-bg',
  },

  {
    templateType: 'VkfInput',
    prop: '--el-menu-active-color',
    label: '--el-menu-active-color',
  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-text-color',
    showAlpha: true,
    label: '--el-menu-text-color',

  },

  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-hover-bg-color',
    showAlpha: true,
    label: '--el-menu-hover-bg-color',
  },

  {
    templateType: 'VkfInput',
    prop: '--el-menu-hover-text-color',
    label: '--el-menu-hover-text-color',
  },

  


]

</script>
<template>
  <VkfForm   :formItems="formItems"></VkfForm>
</template>
