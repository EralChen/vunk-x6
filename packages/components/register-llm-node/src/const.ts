import OpenAI from 'openai'

export enum RegisterLlmNodePort {
  input = 'llm_node_port_input',
  output = 'llm_node_port_output',
}

export const defaultClient = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true,
})
