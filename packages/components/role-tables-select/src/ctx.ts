import { PropType } from 'vue'
import { Row } from './types'

export const props = {
  modelValue: {
    type: Array as PropType<Partial<Row>[]>,
    default: () => ([]),
  },
}

export const emits = {
  'update:modelValue': (v: Partial<Row>[]) => v,
}
