<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { elMenuTheme } from '@skzz-platform/theme'

const formItems: FormItemRendererSource<`--el-menu-${keyof typeof elMenuTheme['default']}`>[] = [
  {
    templateType: 'VkfInput',
    prop: '--el-menu-active-color',
    label: 'Active Color',
  },
  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-text-color',
    showAlpha: true,
    label: 'Text Color',

  },

  {
    templateType: 'VkfColorPicker',
    prop: '--el-menu-hover-bg-color',
    showAlpha: true,
    label: 'Hover Background Color',
  },

  {
    templateType: 'VkfInput',
    prop: '--el-menu-hover-text-color',
    label: 'Hover Text Color',
  },

  


]

</script>
<template>
  <VkfForm   :formItems="formItems"></VkfForm>
</template>
