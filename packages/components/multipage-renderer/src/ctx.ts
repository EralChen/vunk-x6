
import { _SkMultipageCtx } from '@skzz-platform/components/multipage'
import { pickObject } from '@vunk/core/shared/utils-object'

const multipageProps = pickObject(_SkMultipageCtx.props, {
  excludes: ['modules'],
})

export const props = {
  ...multipageProps,
}

export const emits = {
  ..._SkMultipageCtx.emits,
}