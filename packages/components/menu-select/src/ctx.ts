import { PropType } from 'vue'
import { Row } from './types'

export const props = {
  modelValue: {
    type: Object as PropType<Row[]>,
    default: () => ([]),
  },
}

export const emits = {
  'update:modelValue': (e: Row[]) => e,
}