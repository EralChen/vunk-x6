<script lang="tsx">
export default {
  inheritAttrs: false,
}
</script>
<script lang="tsx" setup>
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'
import { NormalObject, setData, SetDataEvent } from '@vunk/core'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
const themeStore = useThemeStore()

const defaultConfig = {
  'font-size': '14px',
  '--f-xxxs': '0.7rem',
  '--f-xxs': '0.8rem',
  '--f-s': '0.9rem',
  '--f-m': '1rem',
  '--f-l': '1.1rem',
  '--f-xl': '1.2rem',
  '--f-xxl': '1.3rem',
  '--f-xxxl': '1.4rem',
}
const formData = computed(() => {
  const obj:NormalObject = {}
  Object.entries(themeStore.fontSizeStyles).forEach(([k, v]) => {
    if (k.startsWith('--f-')) {
      obj[k] = +v.replace('rem', '')
    } else {
      obj[k] = v
    }

  })
  return obj
})
const setFormData = (e: SetDataEvent) => {
  if (e.k.startsWith('--f-')) {
    e.v = `${e.v}rem`
  } 
  setData(themeStore.fontSizeStyles, e)
}

Object.entries(defaultConfig).forEach(([k, v]) => {
  if (!themeStore.fontSizeStyles[k]) {
    themeStore.fontSizeStyles[k] = v
  }
})

const formItems: __SkAppForm.CoreFormItem<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfInput',
    prop: 'font-size',
    label: 'font-size',
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xxxs',
    label: 'f-xxxs',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xxs',
    label: 'f-xxs',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-s',
    label: 'f-s',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-m',
    label: 'f-m',
    disabled: true,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-l',
    label: 'f-l',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xl',
    label: 'f-xl',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xxl',
    label: 'f-xxl',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xxxl',
    label: 'f-xxxl',
    step: 0.1,
  },
]

const formItemsWithDemo = computed(() => {
  return formItems.map(item => {
    return {
      templateType: 'VkfFlex',
      align: 'baseline',
      templateSlots: [
        {
          templateType: 'VkfFlex',
          basis: '400px',
          templateSlots: [
            item,
          ],
        },
       
        {
          templateType: 'Component',
          is: () => <div style={
            {
              fontSize: `var(${item.prop})`,
            }
          }>{item.label}</div>,
        },
      ],
    } as __SkAppForm.FormItem
  })
})


</script>
<template>
  <SkAppForm 
    :labelWidth="100"
    :formItems="formItemsWithDemo" 
    :data="formData"
    @setData="setFormData"
    v-bind="$attrs"
  >
  </SkAppForm>
</template>
<style>

</style>