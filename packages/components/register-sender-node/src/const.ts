import type { NodeData } from './types'
import { FieldType } from '@vunk-x6/shared'

export const defaultData: NodeData = {
  label: 'Sender',
  USER_INPUT: '',
  output: [
    {
      name: 'USER_INPUT',
      label: 'USER_INPUT',
      type: FieldType.String,
      description: '当前输入框文本',
    },
  ],
}
