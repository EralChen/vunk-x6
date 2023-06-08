
import { _VkfUploadCtx } from '@vunk/form/components/upload'
import { NOOP } from '@vunk/core/shared/utils-function'
import { UploadUserFile } from 'element-plus'

export const props = {
  ..._VkfUploadCtx.props,
  modelValue: {
    type: String,
    default: '',
  },
  onRemove: {
    type: Function,
    default: NOOP,
  },
  fileList: {
    type: Array<UploadUserFile>,
    default: undefined,
  },
}

export const emits = {
  ..._VkfUploadCtx.emits,
  'update:modelValue': (e: string) => typeof e === 'string',
}