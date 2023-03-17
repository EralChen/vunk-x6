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

const isU = computed(() => props.type === 'u')
const formItems = ref<__SkAppForm.FormItem<keyof Row>[]>([
  {
    prop: 'modelId',
    templateType: 'VkfInput',
    rules: {
      required: true,
      message: '模型ID不能为空',
    },
    placeholder: '请输入模型ID',
    label: '模型ID',
    disabled: isU as unknown as boolean,
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
