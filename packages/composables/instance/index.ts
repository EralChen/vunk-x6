import type { Graph } from '@antv/x6'
import { inject } from 'vue'

export function useGraph () {
  const graph = inject<Graph | null>('vk_graph', null)
  if (!graph) {
    throw new Error('Graph is not provided')
  }
  return graph
}
