import { PropType } from 'vue'
import { GraphOptions } from '@antv/g6'
import { LoadEvent } from './types'

export const props = {
  defaultOptions: {
    type: Object as PropType<Partial<GraphOptions>>,
    default: () => ({}),
  },
}

export const emits = {
  load: (e: LoadEvent) => e,
}
