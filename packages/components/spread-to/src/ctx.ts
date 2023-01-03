import { AnyFunc, NormalObject } from '@vunk/core'
import { PropType } from 'vue'

export const props = {
  data: {
    type: Object as PropType<NormalObject>,
    required: true,
  },
  type: {
    type: String as PropType<'class'|'style'>,
    default: 'default',
  },
  target: {
    type: Function as PropType<AnyFunc>,
    default: (e) => e.el,
  },
}

export const emits = {
}