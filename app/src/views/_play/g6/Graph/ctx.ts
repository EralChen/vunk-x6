import { GraphData, GraphOptions, TreeGraphData } from '@antv/g6'
import { PropType } from 'vue'

export type SGraphOptions = Omit<GraphOptions, 'container'>


export const propsOpts = {
  ops: {
    type: Object as PropType<SGraphOptions>,
    default: () => ({}),
  },
  data: {
    type: Object as PropType<GraphData | TreeGraphData | undefined>,
  },
}





