<script lang="tsx">
export default {
  inheritAttrs: false,
}
</script>
<script lang="tsx" setup>
// import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'
import { NormalObject, setData, SetDataEvent } from '@vunk/core'
import { baseGap } from '@skzz-platform/theme'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
const themeStore = useThemeStore()
const defaultConfig = { ...baseGap }

const formData = computed(() => {
  const obj:NormalObject = {}
  Object.entries(themeStore.gapBaseStyles).forEach(([k, v]) => {

    if (k.startsWith('--gap-')) {
      obj[k] = +v.replace('rem', '')
    } else {
      obj[k] = v
    }

  })
  return obj
})
const setFormData = (e: SetDataEvent) => {
  if (e.k.startsWith('--gap-')) {
    e.v = `${e.v}rem`
  } 
  setData(themeStore.gapBaseStyles, e)
}

Object.entries(defaultConfig).forEach(([k, v]) => {
  if (!themeStore.gapBaseStyles[k]) {
    themeStore.gapBaseStyles[k] = v
  }
})

const formItems: __SkAppForm.FormItem<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-xxs',
    label: 'gap-xxs',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-s',
    label: 'gap-s',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-m',
    label: 'gap-m',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-l',
    label: 'gap-l',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-xl',
    label: 'gap-xl',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-xxl',
    label: 'gap-xxl',
    step: 0.1,
  },

]

const formItemWithLayout = computed(() => {
  return formItems.map((_item) => {
    const item = _item as __SkAppForm.CoreFormItem
    return {
      templateType: 'VkfFlex',
      direction: 'row',
      align: 'baseline',
      templateSlots: [
        item,
        {
          templateType: 'Component',
          is: () => {
            return <div class="ml-4r">
              <span> {item.label} </span>
              <span style={
                {
                  marginLeft: `var(${item.prop})`,
                }
              }> {item.label} </span>
              <span style={
                {
                  marginLeft: `var(${item.prop})`,
                }
              }> {item.label} </span>
            </div>
          },  
        },
      ],
    } as __SkAppForm.FormItem
  })
})
</script>
<template>
    <SkAppForm 
      :labelWidth="70"
      :formItems="formItemWithLayout" 
      :data="formData"
      @setData="setFormData"
      v-bind="$attrs"
    >
    </SkAppForm>

    <!-- <div >
      <div 
        v-for="(v, k) in defaultConfig" 
        :key="k"
        :style="{
          height: '51px'
        }"
        sk-flex
      >
        <span>11</span>
        <span :style="{
          'marginLeft': `var(${k})`,
        }">22</span>
        <span
          :style="{
            'marginLeft': `var(${k})`,
          }"
        >33</span>
        
      </div>
    </div> -->


</template>
<style>

</style>