<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { Row } from '../types'
import { computed, PropType  } from 'vue'
import { SetDataEvent } from '@vunk/core'


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
  'setData': (e: SetDataEvent) => e,
})

// const isU = computed(() => props.type === 'u')
const formItems = computed<__SkAppForm.FormItem<keyof Row>[]>(() => [
  {
    prop: 'label',
    label: '显示名称',
    templateType: 'VkfInput',
    required: true,
    
  },
  {
    prop: 'value',
    label: '值',
    templateType: 'VkfInput',
    required: true,
  },

  {
    prop: 'memo',
    label: '备注',
    templateType: 'VkfInput',
    type: 'textarea',
    rows: 5,
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
    :label-width="'8em'"
    :form-items="formItems"
    @setData="$emit('setData', $event)"
  />
</template>
