import type { Graph, Node } from '@antv/x6'
import type { MaybeArray, SetDataEvent } from '@vunk/core'
import type { __VkfCascader } from '@vunk/form'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { __VkfTemplatesDefault } from '@vunk/form/components/templates-default'
import type { Keyof, NormalObject } from '@vunk/shared'

export interface SlotArguments {
  node?: Node
  attrs: any
  graph: Graph
  data: NormalObject
}

export interface ChangeEffectContext {
  prop: MaybeArray<string | number>
  parentProp: Array<string | number>
  emitSetData: (e: SetDataEvent) => void
  [key: string]: any
}

export interface ChangeEffect {
  (value: any, ctx: ChangeEffectContext): void
}

export type FormItem<P extends string = string>
  = __VkfTemplatesDefault.Source<P>
  | __VkfInputCollection.Source<P> & {
    changeEffect?: ChangeEffect
  }

export type InputCollectionColumn<
  R extends NormalObject = NormalObject,
> = __VkfInputCollection.Column<
  R,
  FormItem<Keyof<R>>
>
