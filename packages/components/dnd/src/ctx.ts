import type { Dnd } from '@antv/x6-plugin-dnd'
import type { PropType } from 'vue'
import type { DragEndEvent, DragStartEvent } from './types'

export const props = {
  // 模板节点的配置
  defaultOptions: {
    type: Object as PropType<Partial<Dnd.Options> >,
    default: () => ({}),
  },
}

export const emits = {
  dragstart: (_: DragStartEvent) => true,
  dragend: (_: DragEndEvent) => true,
}
