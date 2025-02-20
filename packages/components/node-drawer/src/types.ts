import type { Graph, Node } from '@antv/x6'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { __VkfTemplatesDefault } from '@vunk/form/components/templates-default'
import type { NormalObject } from '@vunk/shared'

export interface SlotArguments {
  node?: Node
  attrs: any
  graph: Graph
  data: NormalObject
}

export type FormItem<P extends string = string>
  = __VkfTemplatesDefault.Source<P>
  | __VkfInputCollection.Source<P>
