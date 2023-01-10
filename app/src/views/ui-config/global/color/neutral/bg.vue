<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'

/* 
    --el-bg-color-page: #0a0a0a;
    --el-bg-color: #141414;
    --el-bg-color-overlay: #1d1e1f;
*/
const defaultConfig = {
  '--el-bg-color-page': '#0a0a0a',
  '--el-bg-color': '#141414',
  '--el-bg-color-overlay': '#1d1e1f',
}

const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-bg-color-page',
    label: 'Page',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-bg-color',
    label: 'Background',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-bg-color-overlay',
    label: 'Overlay',
  },
]
</script>
<template>
  <ElCard >
    <template #header>
      <a 
        :href="'https://element-plus.gitee.io/zh-CN/component/color.html'" 
        target="_blank"
      >Bg Color</a>
    </template>
    <div sk-flex="row" sub:ml-m>

      <VkfForm  :formItems="formItems" v-bind="$attrs"></VkfForm>

      <div sub:mt-m>
        <div v-for="(v, k) in defaultConfig" :key="k">
          <div :style="{
            background: `var(${k})`,
          }">
            {{ k }}
          </div>

        </div>
      </div>

    </div>
  </ElCard>

</template>
<style>

</style>