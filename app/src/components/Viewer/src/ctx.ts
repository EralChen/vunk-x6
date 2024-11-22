import type { PropType } from 'vue'
import { bindPropsFactory } from '@vunk/core/shared/utils-vue'

export const props = {
  defaultOptions: {
    type: Object as PropType<__esri.MapViewProperties>,
    defalut: () => ({}),
  },
}

export const createBindProps = bindPropsFactory(props)
