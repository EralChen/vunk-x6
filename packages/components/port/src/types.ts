import type { Graph, Node } from '@antv/x6'
import type { PortManager } from '@antv/x6/es/model/port'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {
  /** The port metadata */
  port: PortManager.PortMetadata
  /** The node that owns the port */
  node: Node
  /** The graph instance */
  graph: Graph
}

export type OnLoad = (e: LoadEvent) => ReturnVoid
