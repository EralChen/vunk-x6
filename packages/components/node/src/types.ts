import type { Graph, Node } from '@antv/x6'
import type { ReturnVoid } from '@vunk/shared'
import type { __VkGraph } from '@vunk-x6/components/graph'

export interface LoadEvent {
  graph: Graph
  node: Node
}
export type OnLoad = (event: LoadEvent) => ReturnVoid

export interface ClickEvent {
  node: Node
  graph: Graph
  event: __VkGraph.GraphEvents['node:click']
}
export type OnClick = (event: ClickEvent) => ReturnVoid
