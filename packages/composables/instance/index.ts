import type { Graph, Node } from '@antv/x6'
import { inject } from 'vue'

export function useGraph () {
  const graph = inject<Graph | null>('vk_graph', null)
  if (!graph) {
    throw new Error('Graph is not provided')
  }
  return graph
}

export function useNode () {
  const node = inject<Node | null>('vk_node', null)
  if (!node) {
    throw new Error('Node is not provided')
  }
  return node
}
