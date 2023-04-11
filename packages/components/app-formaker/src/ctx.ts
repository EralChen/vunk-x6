import { _VkfDesignerCtx } from '@vunk/formaker/components/designer'
export const props = {
  ..._VkfDesignerCtx.props,
  canU: {
    type: Boolean,
    default: true,
  },
}

export const emits = {
  ..._VkfDesignerCtx.emits,
  'u': null,
}