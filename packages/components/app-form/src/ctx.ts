
import { _VkfFormCtx } from '@vunk/form'
import type { SetDataEvent } from '@vunk/core'
export const props = {
  ..._VkfFormCtx.props,
}

export const emits = {
  ..._VkfFormCtx.emits,
  setData: (e: SetDataEvent) => e,
}