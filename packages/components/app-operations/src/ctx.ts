import { NOOP } from '@vunk/core/shared/utils-function'
import { Button } from '@skzz-platform/api/system/button'
import { PropType } from 'vue'


export const props = {
  modules: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  api: {
    type: Function  as PropType<() => Promise<Button[]>>,
    default: NOOP,
  },

  excludes: {
    type: Array as PropType<string[]>,
    default: () => ['search'],
  },
}

export const emits = {
  c: null,
  r: null,
  u: null,
  d: null,
  increase: null,
  modify: null,
  remove: null,
  search: null,
  click: (e: string) => e, 
}
