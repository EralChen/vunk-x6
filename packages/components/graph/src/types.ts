import type { EventArgs, Graph } from '@antv/x6'
import type { ReturnVoid } from '@vunk/shared'
import type { Emitter } from 'mitt'

export type Module = 'vue_shape_teleport'

export interface LoadEvent {
  graph: Graph
}

export interface MousewheelGuardClassContext {
  getMousewheelGuardClass: () => string[]
  addMousewheelGuardClass: (className: string) => void
  removeMousewheelGuardClass: (className: string) => void
}

export type OnLoad = (event: LoadEvent) => ReturnVoid

export interface GraphEvents {
  'node:click': EventArgs['node:click']
  'node:mousedown': EventArgs['node:mousedown']
  'selection:changed': EventArgs['selection:changed']
  'blank:click': EventArgs['blank:click']
  'node:mouseup': EventArgs['node:mouseup']
  'node:move': EventArgs['node:move']
  'node:mousemove': EventArgs['node:mousemove']
  [key: string | symbol]: any
}

export type GraphEmitter = Emitter<GraphEvents>
