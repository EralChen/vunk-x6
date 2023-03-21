import { Graph, IGraph, ShapeStyle } from '@antv/g6'
import type { Minimap } from '@antv/g6-plugin'
import { ReturnVoid } from '@vunk/core'

export type DefaultOptions = {
  viewportClassName?: string;
  type?: 'default' | 'keyShape' | 'delegate';
  size?: number[];
  delegateStyle?: ShapeStyle;
  refresh?: boolean;
  padding?: number;
  hideEdge?: boolean;
  className?: string;
  graph?: IGraph;
  [key: string]: any;
}

export type LoadEvent = {
  graph: Graph,
  minimap: Minimap,
}
export type OnLoad = (e: LoadEvent) => ReturnVoid

export {}
