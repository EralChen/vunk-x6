import type { EventArgs, Graph } from '@antv/x6'
import type { ReturnVoid } from '@vunk/shared'
import type { Emitter } from 'mitt'

export type Module = 'vue_shape_teleport'

export interface LoadEvent {
  graph: Graph
}

export type OnLoad = (event: LoadEvent) => ReturnVoid

export interface GraphEvents {
  'node:click': EventArgs['node:click']
  'node:mousedown': EventArgs['node:mousedown']
  'selection:changed': EventArgs['selection:changed']
  [key: string | symbol]: any
}
export type GraphEmitter = Emitter<GraphEvents>
