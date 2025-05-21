import type { __VkNode } from '@vunk-x16/components/node'

export interface LLMSource extends __VkNode.Source {
  templateType: 'VkRegisterLlmNode'
}

export type SourceItem = LLMSource
// | xxx
