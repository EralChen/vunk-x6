import type { Graph, Node } from '@antv/x6'

export interface StartNodeData {
  title?: string
  [key: string]: any
}

export interface SlotProps {
  data: StartNodeData
  node?: Node
  graph?: Graph
}
