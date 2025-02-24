import type { Field, FieldWithValue } from '@vunk-x6/shared'

import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources'

/**
 * @description 节点需要的配置数据
 */
export interface NodeData {
  /**
   * @description 模型的 id
   */
  modelId: string

  /**
   * @description 输入字段
   */
  output: Field[]

  /**
   * @description 输出字段
   */
  input: FieldWithValue[]

  /**
   * @description 大模型对话的配置
   * @link https://app.apifox.com/link/project/2100343/apis/api-67883981
   */
  chatCompletionCreateParams: Partial<ChatCompletionCreateParamsNonStreaming>
}

export {
  ChatCompletionCreateParamsNonStreaming,
}
