
import { _VkfFormItemCtx } from '@vunk/form/components/form-item'
export const props = {
  ..._VkfFormItemCtx.props,
  modelValue: {
    type: String,
    default: '',
  },
}

export const emits = {
  'update:modelValue': null,
}
