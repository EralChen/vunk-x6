<script lang="tsx">
export default {
  inheritAttrs: false,
}
</script>
<script lang="tsx" setup>
import { computed } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'

const defaultConfig = {
  '--el-color-primary': '#409EFF',
  '--el-color-success': '#67C23A',
  '--el-color-warning': '#E6A23C',
  '--el-color-danger': '#F56C6C',
  '--el-color-info': '#909399',
}

const formItems: __SkAppForm.CoreFormItem<keyof typeof defaultConfig>[] = [
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

const formItemsWithDemo = computed(() => {
  return formItems.map((item) => {
  
    return {
      templateType: 'VkfFlex',
      align: 'baseline',
      templateSlots: [
        {
          templateType: 'VkfFlex',
          basis: '150px',
          templateSlots: [
            item,
          ],
        },
      
        {
          templateType: 'Component',
          is: () => <div
            style={
              {
                color: `var(${item.prop})`,
              }
            }
          >{item.prop}</div>,
        },
      ],
    } as __SkAppForm.FormItem
  })
})

</script>
<template>
  <SkAppForm 
    :labelWidth="80" 
    :formItems="formItemsWithDemo" 
    v-bind="$attrs"
  >
  </SkAppForm>

  <!-- <div sub:mt-m>
    <div v-for="(v, k) in defaultConfig" :key="k">
      <div :style="{
        color: `var(${k})`,
      }">{{ k }}</div>

    </div>
  </div> -->

</template> 