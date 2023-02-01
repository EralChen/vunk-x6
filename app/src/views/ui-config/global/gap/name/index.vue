<script lang="tsx">
export default {
  inheritAttrs: false,
}
</script>
<script lang="tsx" setup>
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
import { namedGap, baseGap } from '@skzz-platform/theme'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
const themeStore = useThemeStore()

const gapOptions =  Object.keys(baseGap).map(item => {
  return {
    label: item,
    value: `var(--gap-${item})`,
  }
})

const formItems: __SkAppForm.FormItem<`--gap-${keyof typeof namedGap}`>[] = [
  {
    templateType: 'VkfSelect',
    prop: '--gap-page',
    label: 'gap-page',
    options: gapOptions,
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
    options: gapOptions,
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
    prop: '--gap-form-pl-plain',
    label: 'gap-form-pl-plain',
    options: gapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => <p class='text-text-secondary mb-xl'>
      表单左间距: 表单左侧的间距, 更加简洁的。多用于简短的表单页
    </p>,
  },

  {
    templateType: 'VkfSelect',
    prop: '--gap-form-ptb',
    label: 'gap-form-ptb',
    options: gapOptions,
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
    prop: '--gap-multipage-tab-ptb',
    label: 'gap-multipage-tab-ptb',
    options: gapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => <p class='text-text-secondary mb-xl'>
      多页签上下间距: 多页签上下的间距
    </p>,
  },

  
  {
    templateType: 'VkfSelect',
    prop: '--gap-multipage-tab-space',
    label: 'gap-multipage-tab-space',
    options: gapOptions,
    clearable: true,
    allowCreate: true,
    filterable: true,
  },
  {
    templateType: 'Component',
    is: () => <p class='text-text-secondary mb-xl'>
      多页签间距: 多页签之间的间距
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