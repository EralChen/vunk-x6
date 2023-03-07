import { dialogEmits, dialogProps } from 'element-plus'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
export const props = {
  ...dialogProps,
  draggable: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },

  // modal: {
  //   type: Boolean,
  //   default: false,
  // },
}
export const createBindProps = bindPropsFactory(props)

export const emits = {
  ...dialogEmits,
}
export const createOnEmits = onEmitsFactory(emits)