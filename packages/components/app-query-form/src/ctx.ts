import { _SkAppFormCtx } from '@skzz-platform/components/app-form'
import { Form } from './types'
export const props = {
  ..._SkAppFormCtx.props,
  fixes: {
    type: Number,
    default: undefined,
  },
  inline: {
    type: Boolean,
    default: true,
  },
  expand: {
    type: Boolean,
    default: undefined,
  },
}

export const emits = {
  ..._SkAppFormCtx.emits,
  'update:expand': (expand: boolean) => typeof expand === 'boolean',
  'enter': (e: (Form|null)[]) => e,
}
