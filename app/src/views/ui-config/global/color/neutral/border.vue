<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'

/* 
  --el-border-color: #dcdfe6;
  --el-border-color-light: #e4e7ed;
  --el-border-color-lighter: #ebeef5;
  --el-border-color-extra-light: #f2f6fc;
  --el-border-color-dark: #d4d7de;
  --el-border-color-darker: #cdd0d6;
*/
const defaultConfig = {
  '--el-border-color': '#dcdfe6',
  '--el-border-color-light': '#e4e7ed',
  '--el-border-color-lighter': '#ebeef5',
  '--el-border-color-extra-light': '#f2f6fc',
  '--el-border-color-dark': '#d4d7de',
  '--el-border-color-darker': '#cdd0d6',
}

const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-border-color',
    label: 'Border',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-border-color-light',
    label: 'Border Light',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-border-color-lighter',
    label: 'Border Lighter',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-border-color-extra-light',
    label: 'Border Extra Light',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-border-color-dark',
    label: 'Border Dark',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-border-color-darker',
    label: 'Border Darker',
  },
]
</script>
<template>
  <ElCard >
    <template #header>
      <a 
        :href="'https://element-plus.gitee.io/zh-CN/component/color.html'" 
        target="_blank"
      >Border Color</a>
    </template>
    <div sk-flex="row" sub:ml-m>

      <VkfForm  :formItems="formItems" v-bind="$attrs"></VkfForm>

      <div sub:mt-m>
        <div v-for="(v, k) in defaultConfig" :key="k">
          <div :style="{
            border: `solid 2px var(${k})`,
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