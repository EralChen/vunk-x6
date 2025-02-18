import type { Graph, Node } from '@antv/x6'
import type { NormalObject } from '@vunk/shared'

export interface SlotArguments {
  node?: Node
  attrs: any
  graph: Graph
  data: NormalObject
}
