import type { PropType } from 'vue'
import type { Groups } from './types'
import { defaultGroups } from './const'

export const props = {
  shape: {
    type: String,
    required: true as const,
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

}

export const emits = {
}
