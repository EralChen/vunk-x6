import type { Graph } from '@antv/x6'
import type { PropType } from 'vue'
import type { LoadEvent, Module } from './types'

export const props = {
  defaultOptions: {
    type: Object as PropType<Graph.Options>,
    default: () => ({}),
  },
  modules: {
    type: Array<Module>,
    default: () => ['vue_shape_teleport'] as Module[],
  },

}

export const emits = {
  load: (e: LoadEvent) => e,
}
