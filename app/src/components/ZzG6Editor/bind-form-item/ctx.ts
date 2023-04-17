import { PropType } from 'vue'


export const propsOp = {
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => ([]),
  },
  formId: {
    type: String,
    default: '',
  },
  prop: {},
  Renderer: {},
  raw: {},
}

export const emits = {
  'update:modelValue': (v: any) => v,
}
