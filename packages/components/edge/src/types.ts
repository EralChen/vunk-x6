import type { Edge, Graph } from '@antv/x6'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {
  graph: Graph
  edge: Edge
}

export type OnLoad = (event: LoadEvent) => ReturnVoid
