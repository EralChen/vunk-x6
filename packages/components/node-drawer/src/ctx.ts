import type { PropType } from 'vue'

export const props = {
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  shape: {
    type: String,
    required: true,
  },

  size: {
    type: [String, Number] as PropType<string | number>,
    default: 550,
  },

  withHeader: {
    type: Boolean,
    default: true,
  },
}

export const emits = {
  'update:modelValue': (_value: boolean) => true,
}
