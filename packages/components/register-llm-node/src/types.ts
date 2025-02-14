export interface Field {
  name: string
  type: string
  description?: string
}

export interface ValueRef {
  id: string
  name: string
}

export interface InputField extends Field {
  valueRef: ValueRef
}

export interface Data {
  modelId: string
  output: Field[]
  input: InputField[]
  prompt: string
}
