<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'
import { NormalObject, setData, SetDataEvent } from '@vunk/core'
const themeStore = useThemeStore()

const defaultConfig = {
  // '--gap-xxxs': '0.7rem',
  '--gap-xxs': '0.8rem',
  '--gap-s': '0.9rem',
  '--gap-m': '1rem',
  '--gap-l': '1.1rem',
  '--gap-xl': '1.2rem',
  '--gap-xxl': '1.3rem',
  // '--gap-xxxl': '1.4rem',
}
const formData = computed(() => {
  const obj:NormalObject = {}
  Object.entries(themeStore.gapStyles).forEach(([k, v]) => {
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
  setData(themeStore.gapStyles, e)
}

Object.entries(defaultConfig).forEach(([k, v]) => {
  if (!themeStore.gapStyles[k]) {
    themeStore.gapStyles[k] = v
  }
})

const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  // {
  //   templateType: 'VkfInputNumber',
  //   prop: '--gap-xxxs',
  //   label: 'gap-xxxs',
  //   step: 0.1,
  // },
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
  // {
  //   templateType: 'VkfInputNumber',
  //   prop: '--gap-xxxl',
  //   label: 'gap-xxxl',
  //   step: 0.1,
  // },
]
</script>
<template>
  <ElCard >
    <template #header>
     Gap
    </template>

    <div sk-flex="row" sub:ml-2r>

      <VkfForm 
        :formItems="formItems" 
        :data="formData"
        @setData="setFormData"
        v-bind="$attrs"
      >
      </VkfForm>

      <div >
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
      </div>

    </div>
  </ElCard>

</template>
<style>

</style>