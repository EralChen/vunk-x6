import { Graph } from '@antv/g6'
import { ReturnVoid } from '@vunk/core'
export type LoadEvent = {
  graph: Graph,
}
export type OnLoad = (e: LoadEvent) => ReturnVoid

export {}
