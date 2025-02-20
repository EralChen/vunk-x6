import type { NodeData } from './types'
import { FieldType } from '@vunk-x6/shared'

export enum RegisterStartNodePort {
  output = 'start_node_port_output',
}

export const defaultData: NodeData = {
  input: [
    {
      name: 'USER_INPUT',
      type: FieldType.String,
      default: '',
      description: '用户输入',
    },
    {
      name: 'CONVERSATION_NAME',
      type: FieldType.String,
      default: 'DEFAULT',
      description: '本次请求绑定的会话，会自动写入消息、会从该会话读对话历史。',
    },
  ],
}
