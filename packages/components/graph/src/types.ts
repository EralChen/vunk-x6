import type { EventArgs, Graph } from '@antv/x6'
import type { ReturnVoid } from '@vunk/shared'
import type { Emitter } from 'mitt'

export interface LoadEvent {
  graph: Graph
}

export type OnLoad = (event: LoadEvent) => ReturnVoid

export interface GraphEvents {
  'node:click': EventArgs['node:click']
  [key: string | symbol]: any
}
export type GraphEmitter = Emitter<GraphEvents>
