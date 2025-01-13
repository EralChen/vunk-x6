import type { Graph, Node } from '@antv/x6'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {
  graph: Graph
  node: Node
}

export type OnLoad = (event: LoadEvent) => ReturnVoid
