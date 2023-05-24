<script lang="tsx">
import { PropType, defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Row } from '../types'
import { ElLink } from 'element-plus'
import SkAppIcon from '@skzz-platform/components/app-icon'
import { PATTERN } from '@skzz-platform/shared/utils-form'

export default defineComponent({
  components: {
    SkAppForm,
  },
  props: {
    data: {
      type: Object as PropType<Partial<Row>>,
      required: true,
    },
  },
  emits: {
    submit: (data: Row) => data,
  },
  setup (props, { emit }) {
    const formItems: __SkAppForm.FormItem<keyof Row>[] = [
      {
        templateType: 'VkfInput',
        prop: 'buttonId',
        label: '编号',
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.code,
          },
        ],
        maxlength: 10,
        
      },  
      {
        templateType: 'VkfInput',
        prop: 'label',
        label: '名称',
        maxlength: 10,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.normal,
          },
        ],
      },
      {
        templateType: 'VkfInput',
        prop: 'event',
        label: '事件',
        maxlength: 10,
      },
      {
        templateType: 'VkfInputNumber',
        prop: 'idx',
        label: '排序',

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
   
          <ElLink target="_blank" 
            type='primary'
            href='https://element-plus.org/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88'>

            <span>图标站点</span>
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
          emit('submit', props.data as Row)
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
    :label-width="'5em'"
    :data="data"
    :form-items="formItems"
  />
</template>
