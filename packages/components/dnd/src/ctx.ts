import type { Dnd } from '@antv/x6-plugin-dnd'
import type { PropType } from 'vue'

export const props = {
  // 模板节点的配置
  defaultOptions: {
    type: Object as PropType<Partial<Dnd.Options>>,
    default: () => ({}),
  },

  /**
   * 是否启用拖拽功能
   */
  draggable: {
    type: Boolean,
    default: true,
  },
}

export const emits = {
  // dragstart: (_: DragStartEvent) => true,
  // dragend: (_: DragEndEvent) => true,
}
