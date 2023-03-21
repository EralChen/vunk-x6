import { PropType } from 'vue'
import { DefaultOptions, LoadEvent } from './types'


export const props = {
  defaultOptions: {
    type: Object as PropType<DefaultOptions>,
    default: () => ({}),
  },
}

export const emits = {
  load: (e: LoadEvent) => e,
}