import type { Graph } from '@antv/x6'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {
  graph: Graph
}

export type OnLoad = (event: LoadEvent) => ReturnVoid
