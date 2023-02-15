import { PropType } from 'vue'

export const props = {
  modules: {
    type: Array as PropType<string[]>,
    default: () => ['r','d'],
  },
}

export const emits = {
  c: null,
  r: null,
  u: null,
  d: null,
  click: (e: string) => e, 
}
