
import { _VkfFormCtx } from '@vunk/form'
import type { SetDataEvent } from '@vunk/core'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
export const props = {
  ..._VkfFormCtx.props,
}
export const createBindProps = bindPropsFactory(props)

export const emits = {
  ..._VkfFormCtx.emits,
  setData: (e: SetDataEvent) => e,
}

export const createOnEmits = onEmitsFactory(emits)
