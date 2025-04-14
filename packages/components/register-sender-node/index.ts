import type { App } from 'vue'
import VkRegisterSenderNode from './src/index.vue'

export * as __VkRegisterSenderNode from './src/types'

VkRegisterSenderNode.install = (app: App): void => {
  app.component(VkRegisterSenderNode.name || 'VkRegisterSenderNode', VkRegisterSenderNode)
}
export {
  VkRegisterSenderNode,
}
export default VkRegisterSenderNode
