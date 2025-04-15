import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { Keyof, NormalObject } from '@vunk/shared'
import type { FormItem } from './FormItem'

export type InputCollectionColumn<
  R extends NormalObject = NormalObject,
> = __VkfInputCollection.Column<
  R,
  FormItem<Keyof<R>>
>
