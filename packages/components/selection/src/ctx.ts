import type { Cell, ModifierKey } from '@antv/x6'
import type { Selection } from '@antv/x6-plugin-selection'
import type { PropType } from 'vue'
import type { LoadEvent } from './types'

export const props = {
  modelValue: {
    type: Array as PropType<Cell[]>,
    default: () => [],
  },
  mutiple: {
    type: Boolean,
    default: false,
  },
  movable: {
    type: Boolean,
    default: true,
  },
  rubberband: {
    type: Boolean,
    default: false,
  },
  strict: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: [Function, null] as PropType<Selection.Filter>,
    default: undefined,
  },
  modifiers: {
    type: [String, Array] as PropType<string | ModifierKey[]>,
    default: undefined,
  },
  displayContent: null,
}

export const emits = {
  'update:modelValue': (value: Cell[]) => Array.isArray(value),
  'load': (e: LoadEvent) => e,
}
