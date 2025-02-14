export interface Field {
  name: string
  type: string
  description?: string
}

export interface ValueRef {
  id: string
  name: string
}

export interface FieldWithValue extends Field {
  valueRef: ValueRef
}

export interface Data {
  modelId: string
  output: Field[]
  input: FieldWithValue[]
  prompt: string
}
