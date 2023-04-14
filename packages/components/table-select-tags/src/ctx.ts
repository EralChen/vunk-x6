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
  placeholder: {
    type: String,
    default: '点击选择',
  },
}

export const emits = {
  click: (e: MouseEvent) => e,
  'update:modelValue': (e: Tag[]) => e,
}