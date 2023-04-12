import Renderer from 'esri/renderers/Renderer'
import { PropType } from 'vue'


export const propsOp = {
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array,
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
