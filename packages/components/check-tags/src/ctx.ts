
import { PropType } from 'vue'
import { Option } from './types'
import { SetDataEvent, UnsetDataEvent } from '@vunk/core'
export const props = {
  modelValue: null,
  options: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  modules: {
    type: Array as PropType<('creatable')[]>,
    default: () => [],
  },
  editMaxlength: {
    type: Number,
    default: 10,
  },
}

export const emits = {
  'update:modelValue': null,
  'setData:options': (e: SetDataEvent) => e,
  'unsetData:options': (e: UnsetDataEvent) => e,
}