import type { App } from 'vue'
import VkNode from './src/index.vue'

export * as __VkNode from './src/types'

VkNode.install = (app: App): void => {
  app.component(VkNode.name || 'VkNode', VkNode)
}
export {
  VkNode,
}
export default VkNode
