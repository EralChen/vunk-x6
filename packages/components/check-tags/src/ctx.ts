
import { PropType } from 'vue'
import { Option } from './types'

export const props = {
  modelValue: null,
  options: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
  clearable: {
    type: Boolean,
    default: true,
  },
}

export const emits = {
  'update:modelValue': null,
}