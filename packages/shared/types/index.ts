import type { __VkRegisterNode } from '@vunk-x6/components/register-node'

export type Field<T = string> = __VkRegisterNode.Field<T>

export interface FieldWithValue<T = string> extends Field<T> {
  value: any
}
