import type { PropType } from 'vue'

export const props = {
  shape: {
    type: String,
    required: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
}

export const emits = {
}
