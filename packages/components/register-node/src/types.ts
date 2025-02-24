import type { FieldType } from './const'

export interface Field<T = string> {
  /**
   * 数据库表字段名
   */
  name: T
  /**
   * 类型
   */
  type: FieldType
  /**
   * 显示名称
   */
  label?: string
  /**
   * 默认值
   */
  defaultValue?: string
  /**
   * 描述
   */
  description?: string

  /**
   * 如果是 Object/Array<Object> 类型，可以包含子字段
   */
  children?: Field[]
}

export interface FieldWithValue<T = string> extends Field<T> {
  valueRef?: string[]
}
