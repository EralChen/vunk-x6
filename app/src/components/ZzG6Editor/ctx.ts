import { bindPropsFactory } from '@vunk/core/shared/utils-vue'
import { propsOp as bPropsop} from './bind-form-item/ctx'
import { props } from '@zzg6/flow/components/editor/src/ctx'

export const propsOp = {
  ...props,
  formId: bPropsop.formId,
}

export const bindProps = bindPropsFactory(propsOp)
