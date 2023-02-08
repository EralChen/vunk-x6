<script lang="ts" setup>
import { layoutTopTheme } from '@skzz-platform/theme'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'

const formItems: __SkAppForm.CoreFormItem<keyof typeof layoutTopTheme>[] = [
  {
    templateType: 'SkCssColorPicker',
    prop: '--layout-top-bg',
    label: '--layout-top-bg',
  },

  {
    templateType: 'SkCssColorPicker',
    prop: '--el-menu-active-color',
    label: '--el-menu-active-color',
  },
  {
    templateType: 'SkCssColorPicker',
    prop: '--el-menu-text-color',

    label: '--el-menu-text-color',

  },

  {
    templateType: 'SkCssColorPicker',
    prop: '--el-menu-hover-bg-color',

    label: '--el-menu-hover-bg-color',
  },

  {
    templateType: 'SkCssColorPicker',
    prop: '--el-menu-hover-text-color',
    label: '--el-menu-hover-text-color',
  },

  


]

</script>
<template>
  <SkAppForm  :formItems="formItems"></SkAppForm>
</template>
