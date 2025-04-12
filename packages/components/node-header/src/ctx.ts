import type { Node } from '@antv/x6'
import type { PropType } from 'vue'

export const props = {
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  node: {
    type: Object as PropType<Node>,
    default: () => ({}),
  },
}

export const emits = {
  'update:title': null,
}
