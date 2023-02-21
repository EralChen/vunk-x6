import { __SkMultipage } from '@skzz-platform/components/multipage'
import { AnyFunc } from '@vunk/core'
export type VM = {
  data: {
    items: Map<string|number, {
      module: __SkMultipage.Module,
      slots: {
        default: AnyFunc,
        options: AnyFunc,
      }
    }>
  }
}
export {}
