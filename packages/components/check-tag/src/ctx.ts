import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import { checkTagProps, checkTagEmits } from 'element-plus'
export const props = {
  ...checkTagProps,
  closeable: {
    type: Boolean,
    default: false,
  },
}

export const createCheckTagBindProps = bindPropsFactory(checkTagProps)

export const emits = {
  ...checkTagEmits,
  close: null,
}

export const createCheckTagOnEmits = onEmitsFactory(checkTagEmits)
