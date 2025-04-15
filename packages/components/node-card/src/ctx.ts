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

  /**
   * @description 某些 card 中的交互, 会冒泡到 card 上, 触发 drawer 弹出, 你可以通过给对应的元素添加这个 class 来阻止事件冒泡
   */
  stopClickClass: {
    type: Array<string>,
    default: () => ['vk-node-card-stop__click'],
  },

  /**
   * @description 某些 card 中的交互, 会冒泡到 card 上, 节点拖动, 你可以通过给对应的元素添加这个 class 来阻止事件冒泡
   */
  stopMoveClass: {
    type: Array<string>,
    default: () => ['vk-node-card-stop__move'],
  },

  /**
   * @description 某些 card 中的交互, 会冒泡到 card 上, 节点缩放, 你可以通过给对应的元素添加这个 class 来阻止事件冒泡
   */
  stopZoomClass: {
    type: Array<string>,
    default: () => ['vk-node-card-stop__zoom'],
  },
}

export const emits = {
}
