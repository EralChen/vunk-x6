import type { Field } from '@vunk-x6/shared'

/**
 * @description 开始节点用户输入数据
 */
export interface StartRow {
  USER_INPUT: string
  CONVERSATION_NAME: string
}

/**
 * @description 节点需要的配置数据
 */
export interface NodeData {
  label: string
  input: InputItem[]
}

export interface InputItem extends Field<keyof StartRow> {}
