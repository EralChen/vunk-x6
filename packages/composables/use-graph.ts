import { Graph } from '@antv/g6'
import { inject } from 'vue'

export const useGraph = () => {
  const g = inject<Graph|null>('skG6Graph', null)
  if (!g) {
    throw new Error('useGraph must be used after useGraphProvider')
  }
  return g 
}
