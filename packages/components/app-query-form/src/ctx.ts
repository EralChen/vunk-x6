import { _SkAppFormCtx } from '@skzz-platform/components/app-form'
export const props = {
  ..._SkAppFormCtx.props,
  fixes: {
    type: Number,
    default: 3,
  },
  inline: {
    type: Boolean,
    default: true,
  },
}

export const emits = {
  ..._SkAppFormCtx.emits,
}