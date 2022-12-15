<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { FormItemRendererSource, VkfForm } from '@vunk/form'

const defaultConfig = {
  '--el-color-primary': '#409EFF',
  '--el-color-success': '#67C23A',
  '--el-color-warning': '#E6A23C',
  '--el-color-danger': '#F56C6C',
  '--el-color-info': '#909399',
}

const formItems: FormItemRendererSource<keyof typeof defaultConfig>[] = [
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-color-primary',
    label: 'Primary',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-color-success',
    label: 'Success',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-color-warning',
    label: 'Warning',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-color-danger',
    label: 'Danger',
  },
  {
    templateType: 'VkfColorPicker',
    showAlpha: true,
    prop: '--el-color-info',
    label: 'Info',
  },
]
</script>
<template>
  <ElCard >
    <template #header>
      <a 
        :href="'https://element-plus.gitee.io/zh-CN/component/color.html'" 
        target="_blank"
      >Base Color</a>
    </template>
    <div sk-flex="row" sub:ml-m>

      <VkfForm :labelWidth="'6em'" :formItems="formItems" v-bind="$attrs"></VkfForm>

      <div sub:mt-m>
        <div v-for="(v, k) in defaultConfig" :key="k">
          <div :style="{
            color: `var(${k})`,
          }">{{ k }}</div>

        </div>
      </div>

    </div>
  </ElCard>

</template>
<style>

</style>