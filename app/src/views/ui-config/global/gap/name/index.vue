<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
const themeStore = useThemeStore()

const defaultConfig = {
  '--gap-page': 'var(--gap-xxl)',
}
const gapOptions =  [
  {
    label: 'gap-xxxs',
    value: 'var(--gap-xxxs)',
  },
  {
    label: 'gap-xxs',
    value: 'var(--gap-xxs)',
  },
  {
    label: 'gap-xs',
    value: 'var(--gap-xs)',
  },
  {
    label: 'gap-s',
    value: 'var(--gap-s)',
  },
  {
    label: 'gap-m',
    value: 'var(--gap-m)',
  },
  {
    label: 'gap-l',
    value: 'var(--gap-l)',
  },
  {
    label: 'gap-xl',
    value: 'var(--gap-xl)',
  },
  {
    label: 'gap-xxl',
    value: 'var(--gap-xxl)',
  },
  {
    label: 'gap-xxxl',
    value: 'var(--gap-xxxl)',
  },
]
const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfSelect',
    prop: '--gap-page',
    label: '页面间距 gap-page',
    options: gapOptions,
  },
]
</script>
<template>
  <div sk-flex="row" sub:ml-2r>

    <VkfForm 
      :formItems="formItems" 
      :data="themeStore.gapNamedStyles"
      @setData="setData(themeStore.gapNamedStyles, $event)"
      v-bind="$attrs"
    >
    </VkfForm>

    <!-- <div >
      <div 
        v-for="(v, k) in defaultConfig" 
        :key="k"
        :style="{
          height: '51px'
        }"
        sk-flex
      >
        <span>{{k}}</span>
        <span :style="{
          'marginLeft': `var(${k})`,
        }">{{k}}</span>
        <span
          :style="{
            'marginLeft': `var(${k})`,
          }"
        >{{k}}</span>
        
      </div>
    </div> -->

  </div>
</template>
<style>

</style>