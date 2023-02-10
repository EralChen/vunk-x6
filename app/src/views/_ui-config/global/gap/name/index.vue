<script lang="tsx">
export default {
  inheritAttrs: false,
}
</script>
<script lang="tsx" setup>
import { useThemeStore } from '@skzz-platform/stores/theme'
import { setData } from '@vunk/core'
import { namedGap, baseGapOptions } from '@skzz-platform/theme'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
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
    is: () => <p class='text-text-secondary mb-xl'>
      页面间距: 系统页面主体的间距， 如：页面主体周围的间距
    </p>,
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
    is: () => <p class='text-text-secondary mb-xl'>
      表单左间距: 表单左侧的间距
    </p>,
  },



  {
    templateType: 'VkfSelect',
    prop: '--gap-form-ptb',
    label: 'gap-form-ptb',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => <p class='text-text-secondary mb-xl'>
      表单上下间距: 表单上下的间距
    </p>,
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-tab-ptb',
    label: 'gap-tab-ptb',
    options: baseGapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => <p class='text-text-secondary mb-xl'>
      页签上下间距: 页签上下的间距
    </p>,
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
    is: () => <p class='text-text-secondary mb-xl'>
      页签间距: 页签之间的间距
    </p>,
  },

]

</script>
<template>
  <SkAppForm 
    :labelWidth="200"
   
    :formItems="formItems" 
    :data="themeStore.gapNamedStyles"
    @setData="setData(themeStore.gapNamedStyles, $event)"
    v-bind="$attrs"
  >
  </SkAppForm>
</template>
<style>

</style>