import type { Graph } from '@antv/x6'
import type { PropType } from 'vue'
import type { LoadEvent } from './types'

export const props = {
  defaultOptions: {
    type: Object as PropType<Graph.Options>,
    default: () => ({}),
  },
}

export const emits = {
  load: (e: LoadEvent) => e,
}
