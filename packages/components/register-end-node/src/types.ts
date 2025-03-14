import type { Field } from '@vunk-x6/shared'
import type { OutputMode } from './const'

/**
 * @description 节点需要的配置数据
 */
export interface NodeData {
  label: string
  output: Field[]
  outputMode: OutputMode
  textTemplate: string
}
