import { Graph } from '@antv/g6'
import { inject, ShallowRef } from 'vue'

export const graphSymbol = Symbol('graph')

export function useGraph () {
  return inject<ShallowRef<Graph>>(graphSymbol)
}