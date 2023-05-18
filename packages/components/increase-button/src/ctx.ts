import { PropType } from 'vue'
import { ButtonProps, buttonEmits, buttonProps } from 'element-plus'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'

export const createElBindProps = bindPropsFactory(buttonProps)
export const createElOnEmits = onEmitsFactory(buttonEmits)

export const props = {
  ...buttonProps,
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: 'primary',
  },
  btns: {
    type: [Promise, Array, Function] as PropType<any>,
    default: () => [],
  },
}

export const emits = {
  ...buttonEmits,
}
