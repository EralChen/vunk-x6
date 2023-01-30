import { Media } from '@vunk/core'
import { PropType } from 'vue'

export const props = {
  modelValue: {
    type: String,
    default: '',
  },
  modules: {
    type: Array as PropType<Media[]>,
    default: () => [],
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  tabXClass: {
    type: [String, Object],
    default: '',
  },

}

export const emits = {
  'update:modelValue': (value: string) => value,
}