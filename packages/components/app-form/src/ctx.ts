
import { _VkfFormCtx } from '@vunk/form'
import type { AnyFunc, SetDataEvent } from '@vunk/core'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import { PropType } from 'vue'
export const props = {
  ..._VkfFormCtx.props,
  layout: {
    type: Boolean,
    default: false,
  },
  span: {
    type: Number,
    default: 8,
  },
  rowGutter: {
    type: Number,
    default: 110,
  },
  elRef: {
    type: Function as PropType<AnyFunc>,
    default: undefined,
  },

}
export const createBindProps = bindPropsFactory(props)

export const emits = {
  ..._VkfFormCtx.emits,
  setData: (e: SetDataEvent) => e,
  enter: (e: KeyboardEvent) => e,
}

export const createOnEmits = onEmitsFactory(emits)
