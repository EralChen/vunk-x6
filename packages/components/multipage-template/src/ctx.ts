import { PropType } from 'vue'

export const props = {
  label: {
    type: String as PropType<string>,
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
    required: true,
  },
}

export const emits = {
}