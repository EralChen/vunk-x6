<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'

/* 
  --el-text-color-primary: #303133;
  --el-text-color-regular: #606266;
  --el-text-color-secondary: #909399;
  --el-text-color-placeholder: #a8abb2;
  --el-text-color-disabled: #c0c4cc;
*/
const defaultConfig = {
  '--el-text-color-primary': '#303133',
  '--el-text-color-regular': '#606266',
  '--el-text-color-secondary': '#909399',
  '--el-text-color-placeholder': '#a8abb2',
  '--el-text-color-disabled': '#c0c4cc',

}

const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-text-color-primary',
    label: 'Primary',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-text-color-regular',
    label: 'Regular',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-text-color-secondary',
    label: 'Secondary',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-text-color-placeholder',
    label: 'Placeholder',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-text-color-disabled',
    label: 'Disabled',
  },

]
</script>
<template>
  <ElCard >
    <template #header>
      <a 
        :href="'https://element-plus.gitee.io/zh-CN/component/color.html'" 
        target="_blank"
      >Text Color</a>
    </template>
    <div sk-flex="row" sub:ml-m>

      <VkfForm :formItems="formItems" v-bind="$attrs"></VkfForm>

      <div sub:mt-m>
        <div v-for="(v, k) in defaultConfig" :key="k">
          <div :style="{
            color: `var(${k})`,
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