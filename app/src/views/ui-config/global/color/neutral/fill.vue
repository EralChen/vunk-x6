<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'

/* 
    --el-fill-color: #f0f2f5;
    --el-fill-color-light: #f5f7fa;
    --el-fill-color-lighter: #fafafa;
    --el-fill-color-extra-light: #fafcff;
    --el-fill-color-dark: #ebedf0;
    --el-fill-color-darker: #e6e8eb;
    --el-fill-color-blank: #ffffff;
*/
const defaultConfig = {
  '--el-fill-color': '#f0f2f5',
  '--el-fill-color-light': '#f5f7fa',
  '--el-fill-color-lighter': '#fafafa',
  '--el-fill-color-extra-light': '#fafcff',
  '--el-fill-color-dark': '#ebedf0',
  '--el-fill-color-darker': '#e6e8eb',
  '--el-fill-color-blank': '#ffffff',
}

const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-fill-color',
    label: 'Fill',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-fill-color-light',
    label: 'Fill Light',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-fill-color-lighter',
    label: 'Fill Lighter',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-fill-color-extra-light',
    label: 'Fill Extra Light',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-fill-color-dark',
    label: 'Fill Dark',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-fill-color-darker',
    label: 'Fill Darker',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-fill-color-blank',
    label: 'Fill Blank',
  },
]
</script>
<template>
  <ElCard >
    <template #header>
      <a 
        :href="'https://element-plus.gitee.io/zh-CN/component/color.html'" 
        target="_blank"
      >Fill Color</a>
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