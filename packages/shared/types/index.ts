export interface Field<T = string> {
  name: T
  type: string
  default?: string
  description?: string
}

export interface ValueRef {
  id: string
  name: string
}

export interface FieldWithValue<T = string> extends Field<T> {
  valueRef?: ValueRef
}
