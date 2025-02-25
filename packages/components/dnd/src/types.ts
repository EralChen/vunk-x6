import type { Cell } from '@antv/x6'
import type { Dnd } from '@antv/x6-plugin-dnd'

export interface DragStartEvent {
  e: MouseEvent
  node: Cell
  dnd: Dnd
}

export interface DragEndEvent {
  e: MouseEvent
  node: Cell
  dnd: Dnd
}
