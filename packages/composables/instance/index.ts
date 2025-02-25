import type { Edge, Graph, Node } from '@antv/x6'
import type { Dnd } from '@antv/x6-plugin-dnd'
import type { Selection } from '@antv/x6-plugin-selection'
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

export function useEdage () {
  const edge = inject<Edge | null>('vk_edge', null)
  if (!edge) {
    throw new Error('Edge is not provided')
  }
  return edge
}

export function useSelection () {
  const selection = inject<Selection | null>('vk_selection', null)
  if (!selection) {
    throw new Error('Selection is not provided')
  }
  return selection
}

export function useDnd () {
  const dnd = inject<Dnd | null>('vk_dnd', null)
  if (!dnd) {
    throw new Error('Dnd is not provided')
  }
  return dnd
}
