export type Dictionary = {
  color: string | null
  id: number
  label: string
  memo: string | null
  parentValue: null | string
  type: string | null
  value: number | string
}

export type Option = {
  label: string
  value: string | number
  [key: string]: any
}