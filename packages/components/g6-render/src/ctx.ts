import { GraphData, TreeGraphData } from '@antv/g6'
import { PropType } from 'vue'

export const props = {
  data: {
    type: Object as PropType<GraphData | TreeGraphData>,
    default: () => ([]),
  },
}

export const emits = {
}