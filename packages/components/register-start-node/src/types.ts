import type { Field } from '@vunk-x6/shared'

/**
 * @description 开始节点用户输入数据
 */
export interface StartRow {
  query: string
  conversationId: string
}

/**
 * @description 节点需要的配置数据
 */
export interface NodeData {
  input: InputItem[]
}

export interface InputItem extends Field<keyof StartRow> {}
