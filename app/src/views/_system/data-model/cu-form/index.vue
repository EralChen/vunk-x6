<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { computed, PropType, ref  } from 'vue'
import { DataModel as Row } from '@skzz-platform/api/system/data-model'
import { PATTERN } from '@skzz-platform/shared/utils-form'

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
    rules: [ 
      {
        required: true,
      },
      {
        pattern: PATTERN.code,
      },
    ],
    placeholder: '请输入模型ID',
    label: '模型ID',
    disabled: isU as unknown as boolean,
  },

  {
    prop: 'table',
    label: '表名',
    templateType: 'VkfInput',
    rules: [
      {
        required: true,
      },
      {
        pattern: PATTERN.code,
      },
    ],
  },

  {
    prop: 'keys',
    label: '主键',
    templateType: 'VkfSelect',
    allowCreate: true,
    filterable: true,
    multiple: true,
    options: [
      {
        label: 'id',
        value: 'id',
      },
    ],
    required: true,
  },

  {
    prop: 'dir',
    label: '目录',
    templateType: 'VkfInput',
    rules: [
      {
        required: true,
      },
      {
        pattern: PATTERN.code,
      },
    ],
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
