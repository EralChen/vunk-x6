import type { PropType } from 'vue'
import type { LoadEvent } from './types'

export const props = {
  id: {
    type: String,
    default: undefined,
  },
  group: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'left',
  },
}

export const emits = {
  load: (e: LoadEvent) => e,
}
