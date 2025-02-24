import type { NodeData } from './types'
import { FieldType } from '@vunk-x6/shared'
import OpenAI from 'openai'

export enum RegisterLlmNodePort {
  input = 'llm_node_port_input',
  output = 'llm_node_port_output',
}

export const defaultClient = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true,
})

export const defaultData: NodeData = {
  label: '大模型',
  output: [
    {
      name: 'output',
      type: FieldType.String,
    },
  ],
  modelId: 'gpt-3.5-turbo',
  input: [
    {
      name: 'input',
      valueRef: [],
      type: FieldType.String,
    },
  ],

}
