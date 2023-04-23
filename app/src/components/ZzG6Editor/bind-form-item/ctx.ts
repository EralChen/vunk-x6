import { PropType } from 'vue'


export const propsOp = {
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object as PropType<{show: any[]; ref: any[]} | undefined>,
    default: () => ({}),
  },
  formId: {
    type: String,
    default: '',
  },
  prop: {},
  Renderer: {},
  raw: {},
  modelKey: {
    type: String as PropType<'show' | 'ref'>,
    default: 'show',
  },
}

export const emits = {
  'update:modelValue': (v: any) => v,
}
