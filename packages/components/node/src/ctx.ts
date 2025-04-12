import type { Node } from '@antv/x6'
import type { PropType } from 'vue'
import type { ClickEvent, LoadEvent } from './types'

export const props = {
  /**
   * 可基于已有 node 创建
   */
  node: {
    type: Object as PropType<Node>,
    default: undefined,
  },

  id: {
    type: String,
    default: undefined,
  },
  shape: {
    type: String,
    default: 'rect',
  },
  label: {
    type: String,
    default: undefined,
  },

  width: {
    type: Number,
    default: 1,
  },
  height: {
    type: Number,
    default: 1,
  },
  x: {
    type: Number,
    default: undefined,
  },
  y: {
    type: Number,
    default: undefined,
  },

  data: {
    type: Object,
    default: undefined,
  },

  orphan: {
    type: Boolean,
    default: false,
  },

}

export const emits = {
  'load': (e: LoadEvent) => e,
  'click': (e: ClickEvent) => e,
  'update:orphan': null,
  'update:data': null,
}
