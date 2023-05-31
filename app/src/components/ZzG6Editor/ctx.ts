import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import { propsOp as bPropsop} from './bind-form-item/ctx'
import { props, emits as editorEmits } from '@zzg6/flow/components/editor/src/ctx'
export const propsOp = {
  ...props,
  formId: bPropsop.formId,
}

export const bindProps = bindPropsFactory(propsOp)
export const emits = {
  ...editorEmits,
}

export const createOnEmits = onEmitsFactory(emits)