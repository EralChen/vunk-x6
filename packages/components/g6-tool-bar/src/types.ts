import { Graph, IGraph } from '@antv/g6'
import type { ToolBar } from '@antv/g6-plugin'
export type DefaultOptions = {
  handleClick?: (code: string, graph: IGraph) => void;
  getContent?: (graph?: IGraph) => HTMLDivElement | string;
  zoomSensitivity?: number;
  minZoom?: number;
  maxZoom?: number;

  className?: string;
  graph?: IGraph;
  [key: string]: any;
}

export interface LoadEvent {
  graph: Graph,
  toolBar: ToolBar
}
export type OnLoad = (e: LoadEvent) => void

export {}
