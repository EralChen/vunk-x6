import { cardProps } from 'element-plus'
import { bindPropsFactory } from '@vunk/core/shared/utils-vue'
import { PropType } from 'vue'
export const props = {
  ...cardProps,
  shadow: {
    type: String as PropType<'hover' | 'always' | 'never'>,
    default: 'never',
  },
  bodyPadding: {
    type: Boolean,
    default: false,
  },
  flex: {
    type: Boolean,
    default: true,
  },
}
export const createCardBindProps = bindPropsFactory(cardProps)

export const emits = {

}