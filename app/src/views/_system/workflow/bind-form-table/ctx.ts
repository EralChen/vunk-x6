import { PropType } from 'vue'
import { Row } from './types'

export const props = {
  modelValue: {
    type: Object as PropType<Partial<Row>>,
    default: () => ({}),
  },
}

export const emits = {
  'update:modelValue': (v: Partial<Row>[]) => v,
}
