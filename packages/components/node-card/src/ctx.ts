import type { PortManager } from '@antv/x6/es/model/port'
import type { PropType } from 'vue'

export const props = {
  /**
   * @description 节点默认 data
   */
  defaultData: {
    type: Object,
    default: () => ({}),
  },

  /**
   * @description PortManager.PortMetadata[]
   */
  ports: {
    type: Array as PropType<PortManager.PortMetadata[]>,
    default: () => [],
  },

  /**
   * @description 节点的类型
   */
  shape: {
    type: String,
    required: true,
  },

  /**
   * @description 节点描述
   */
  description: {
    type: String,
    default: '',
  },

}

export const emits = {
}
