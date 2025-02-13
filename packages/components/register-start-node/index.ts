import type { App } from 'vue'
import VkRegisterStartNode from './src/index.vue'

export * from './src/const'

export * as __VkRegisterStartNode from './src/types'

VkRegisterStartNode.install = (app: App): void => {
  app.component(VkRegisterStartNode.name || 'VkRegisterStartNode', VkRegisterStartNode)
}
export {
  VkRegisterStartNode,
}
export default VkRegisterStartNode
