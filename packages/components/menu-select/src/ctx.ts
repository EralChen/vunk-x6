import { PropType } from 'vue'
import { Row } from './types'
import { __SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
import { Media, SetDataEvent, UnsetDataEvent } from '@vunk/core'
export const props = {
  modelValue: {
    type: Object as PropType<Row[]>,
    default: () => ([]),
  },
  tableColumns: {
    type: Array as PropType<__SkAppTablesV1.Column[]>,
    default: () => ([]),
  },
  buttons: {
    type: Object as PropType<Record<string, string[]>>,
    default: () => ({}),
  },
  clientOptions: {
    type: Array<Media>,
    default: () => undefined,
  },
}

export const emits = {
  check: null,
  'update:modelValue': (e: Row[]) => e,
  'setData:buttons': (e: SetDataEvent) => e,
  'unsetData:buttons': (e: UnsetDataEvent) => e,
  'update:clientOptions': (e: Media[]) => e,
}