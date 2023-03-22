import { Graph } from '@antv/g6'
import { Grid } from '@antv/g6-plugin'
import { ReturnVoid } from '@vunk/core'

export type DefaultOptions = {
  img?: string;
  /** 网格是否跟随视图移动 */
  follow?: boolean;
}

export interface LoadEvent {
  graph: Graph
  grid: Grid
}
export type OnLoad = (e: LoadEvent) => ReturnVoid

export {}
