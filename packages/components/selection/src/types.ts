import type { Graph } from '@antv/x6'
import type { Selection } from '@antv/x6-plugin-selection'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {
  graph: Graph
  selection: Selection
}

export type SelectionDisplayContent = Selection.Content

export type OnLoad = (e: LoadEvent) => ReturnVoid
