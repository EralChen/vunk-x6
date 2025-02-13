import type { App } from 'vue'
import VkStartNode from './src/index.vue'

export * from './src/const'

export * as __VkStartNode from './src/types'

VkStartNode.install = (app: App): void => {
  app.component(VkStartNode.name || 'VkStartNode', VkStartNode)
}
export {
  VkStartNode,
}
export default VkStartNode
