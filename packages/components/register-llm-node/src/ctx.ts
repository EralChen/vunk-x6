import type OpenAI from 'openai'
import type { PropType } from 'vue'
import { defaultClient } from './const'

export const props = {
  client: {
    type: Object as PropType<OpenAI>,
    default: () => defaultClient,
  },
  apiKey: {
    type: String,
    default: '',
  },
}

export const emits = {
}
