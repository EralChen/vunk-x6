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
}

export const emits = {
  'update:modelValue': (_value: boolean) => true,
}
