import type { LoadEvent } from './types'

export const props = {
  id: {
    type: String,
    default: undefined,
  },
  shape: {
    type: String,
    default: 'rect',
  },

  width: {
    type: Number,
    default: 1,
  },
  height: {
    type: Number,
    default: 1,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
}

export const emits = {
  load: (e: LoadEvent) => e,
}
