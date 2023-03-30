import { PropType } from 'vue'
import { Row } from './types'
import { __SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
export const props = {
  modelValue: {
    type: Object as PropType<Row[]>,
    default: () => ([]),
  },
  tableColumns: {
    type: Array as PropType<__SkAppTablesV1.Column[]>,
    default: () => ([]),
  },
}

export const emits = {
  'update:modelValue': (e: Row[]) => e,
}