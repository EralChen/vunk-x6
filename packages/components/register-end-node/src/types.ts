import type { FieldWithValue } from '@vunk-x6/shared'

/**
 * @description 节点需要的配置数据
 */
export interface NodeData {
  output: FieldWithValue[]
  textTemplate: string
}
