import type { LoadEvent } from './types'
import { PropType } from 'vue'

export const props = {
  id: {
    type: String,
    default: undefined,
  },
  source: null,
  target: null,
}

export const emits = {
  load: (e: LoadEvent) => e,
}
