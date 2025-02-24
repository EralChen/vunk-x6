import type { App } from 'vue'
import VkRegisterLlmNode from './src/index.vue'

export * as __VkRegisterLlmNode from './src/types'

VkRegisterLlmNode.install = (app: App): void => {
  app.component(VkRegisterLlmNode.name || 'VkRegisterLlmNode', VkRegisterLlmNode)
}
export {
  VkRegisterLlmNode,
}
export default VkRegisterLlmNode
