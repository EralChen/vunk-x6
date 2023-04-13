import { PropType } from 'vue'
import { Tag } from './types'

export const props = {
  modelValue: {
    type: Object as PropType<Tag[]>,
    default: () => ([]),
  },
  prop: {
    type: Object,
    default: () => ({
      id: 'id',
      label: 'label',
    }),
  },
  closable: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
}

export const emits = {
  click: (e: MouseEvent) => void 0,
  'update:modelValue': (e: Tag[]) => e,
}