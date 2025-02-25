import type { Graph, Node } from '@antv/x6'
import type { __VkRenderer } from '@vunk/core/components/renderer'
import type { ReturnVoid, VueComponentPropsType } from '@vunk/shared'
import type { __VkGraph } from '@vunk-x6/components/graph'
import type Core from './index.vue'

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

export interface Source extends
  __VkRenderer.SourceItem
  , VueComponentPropsType<typeof Core> {

}
