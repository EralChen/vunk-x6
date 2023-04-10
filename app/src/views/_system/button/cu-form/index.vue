<script lang="tsx">
import { defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Row } from '../types'
import { ElLink } from 'element-plus'
import SkAppIcon from '@skzz-platform/components/app-icon'

export default defineComponent({
  components: {
    SkAppForm,
  },
  props: ['data'],
  emits: {
    submit: (data: Row) => data,
  },
  setup (props, { emit }) {
    const formItems: __SkAppForm.FormItem<keyof Row>[] = [
      {
        templateType: 'VkfInput',
        prop: 'buttonId',
        label: '编号',
        rules: {
          required: true,
        },
      },  
      {
        templateType: 'VkfInput',
        prop: 'label',
        label: '名称',
      },
  
      {
        prop: 'icon',
        templateType: 'VkfInput',
        type: 'textarea',
        rows: 5,
        label: '图标',
      },
      {
        templateType: 'Component',
        is: () => <div sk-flex="row_center" 
          class="sub-ml-widget-space ml-form-label mb-18px"
        >
   
          <ElLink target="_blank" href='https://element-plus.org/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88'>

            <span>图标集合</span>
          </ElLink>
      
    
          <SkAppIcon icon={props.data.icon}></SkAppIcon>

        </div> ,
      },

      {
        templateType: 'VkfButton',
        buttonLabel: '提交',
        type: 'primary',
        size: 'large',
        class: 'is-btn-group',
        onClick: () => {
          emit('submit', props.data)
        },
      },
    ]
    return {
      formItems,
    }
  },
})
</script>
<template>
  <SkAppForm 
    :labelWidth="'5em'"
    :data="data"
    :formItems="formItems"
  ></SkAppForm>
</template>
