import type { Graph, Node } from '@antv/x6'
import type { MaybeArray, SetDataEvent } from '@vunk/core'
import type { __VkfCascader } from '@vunk/form'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { __VkfTemplatesDefault } from '@vunk/form/components/templates-default'
import type { NormalObject } from '@vunk/shared'
import type { CascaderNode } from 'element-plus'

export interface SlotArguments {
  node?: Node
  attrs: any
  graph: Graph
  data: NormalObject
}

export type CascaderChangeEffect = (
  data: any,
  node: CascaderNode[],
  prop: MaybeArray<string>,
  emitSetData: (e: SetDataEvent) => void
) => void

export type FormItem<P extends string = string>
  = (
    __VkfCascader.Source<P> & {
      changeEffect?: CascaderChangeEffect
    }
  )
  | __VkfTemplatesDefault.Source<P>
  | __VkfInputCollection.Source<P>
