<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { Row } from '../types'
import { ElLink } from 'element-plus'
import { computed, PropType, ref  } from 'vue'
import { SkAppIcon } from '@skzz-platform/components/app-icon'

const props = defineProps({
  data: {
    type: Object as PropType<Partial<Row>>,
    default: () => ({}),
  },
  type: {
    type: String as PropType<'c' | 'u' | ''>,
    default: '',
  },
})
const emit = defineEmits({
  'submit': (data: Partial<Row>) => data,
})

const menuIdDisabled = computed(() => {
  return props.type === 'u'
})

const formItems = ref<__SkAppForm.FormItem<keyof Row>[]>([
  {
    prop: 'menuId',
    templateType: 'VkfInput',
    label: '菜单ID',
    placeholder: '请输入菜单ID',
    rules: {
      required: true,
      message: '菜单ID不能为空',
    },
    disabled: menuIdDisabled as unknown as boolean,
  },
  {
    prop: 'name',
    templateType: 'VkfInput',
    label: '菜单名称',
    placeholder: '请输入菜单名称',
    rules: {
      required: true,
      message: '菜单名称不能为空',
    },
  },
  {
    prop: 'path',
    templateType: 'VkfInput',
    rules: {
      required: true,
      message: '路径不能为空',
    },
    placeholder: '请输入路径',
    label: 'URL路径',
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
    class: 'is-btn-group',
    type: 'primary',
    size: 'large',
    validate: true,
    onClick: () => {
      emit('submit', props.data)
    },
  },
])

</script>
<template>
  <SkAppForm
    :data="data"
    :labelWidth="'8em'"
    :formItems="formItems"
  >
  </SkAppForm>
</template>
