import type { __VkfTemplatesDefault } from '@vunk/form'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'

export type FormItem<P extends string = string>
  = __VkfTemplatesDefault.Source<P>
    | __VkfInputCollection.Source<P>
