import { __SkAppTables } from '@skzz-platform/shared'
import { PropType } from 'vue'
import { Row } from './types'

export const props = {
  modelValue: {
    type: Array as PropType<Partial<Row>[]>,
    default: () => ([]),
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: Array as PropType<__SkAppTables.Column[]>,
    default: () => ([]),
  },
}

export const emits = {
  'update:modelValue': (v: Partial<Row>[]) => v,
}
