<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { WorkflowOper as Row } from '../../types'
import { computed, PropType, ref  } from 'vue'
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

const isU = computed(() => props.type === 'u')
const formItems = ref<__SkAppForm.FormItem<keyof Row>[]>([
  {
    templateType: 'VkfInput',
    prop: 'operName',
    label: '名称',
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
    @setData="$emit('setData', $event)"
  >
  </SkAppForm>
</template>
