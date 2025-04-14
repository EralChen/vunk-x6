import type { Graph, Node } from '@antv/x6'
import type { PortManager } from '@antv/x6/lib/model/port'
import type { NormalObject } from '@vunk/shared'
import type { defaultGroups } from './const'

export type Groups = Record<string, PortManager.PortMetadata>

export type DefaultGroup = keyof typeof defaultGroups

/**
 * @description 插槽参数
 */
export interface SlotArgument<T extends NormalObject = NormalObject> {
  node: Node
  attrs: Node['attrs']
  graph: Graph
  data: T
  isActive: boolean
}
