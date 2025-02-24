import type { NormalObject } from '@vunk/shared'
import type { Field, FieldWithValue } from '@vunk-x6/shared'

/**
 * @description 节点需要的配置数据
 */
export interface NodeData {
  model: NormalObject
  output: Field[]
  input: FieldWithValue[]
  prompt: string
}
