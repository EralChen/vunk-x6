import type { __VkRegisterNode } from '@vunk-x6/components/register-node'

export * from './FormItem'
export * from './InformationItem'
export * from './InputCollectionColumn'

export type Field<T = string> = __VkRegisterNode.Field<T>

export interface FieldWithValue<T = string> extends Field<T> {
  value: any
}
