
export const propsOp = {
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  formId: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  'update:modelValue': (v: any) => v,
}
