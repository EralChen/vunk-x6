import type { Node } from '@antv/x6'
import type { PropType } from 'vue'
import type { LoadEvent } from './types'

export const props = {
  modelValue: {
    type: Array as PropType<Node[]>,
    default: () => [],
  },
  mutiple: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  'update:modelValue': (value: Node[]) => Array.isArray(value),
  'load': (e: LoadEvent) => e,
}
