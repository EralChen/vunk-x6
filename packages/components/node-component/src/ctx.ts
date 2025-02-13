import type { PortManager } from '@antv/x6/es/model/port'
import type { PropType } from 'vue'
import type { Groups } from './types'
import { defaultGroups } from './const'

export const props = {
  shape: {
    type: String,
    default: 'node-component',
  },

  groups: {
    type: Object as PropType<Groups>,
    default: () => defaultGroups,
  },

  autoSize: {
    type: Boolean,
    default: true,
  },

  /**
   * autoSize 容器的class
   */
  autoSizeContainerClass: {
    type: String,
    default: '',
  },

  items: {
    type: Array as PropType<PortManager.PortMetadata[]>,
    default: () => [],
  },

}

export const emits = {
}
