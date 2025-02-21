import type { FieldType } from './const'

export interface Field<T = string> {
  name: T
  type: FieldType
  default?: string
  description?: string
  children?: Field[]
}

export interface FieldWithValue<T = string> extends Field<T> {
  valueRef?: Field[]
}
