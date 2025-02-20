import type { App } from 'vue'
import VkRegisterEndNode from './src/index.vue'

export * from './src/const'
export * as __VkRegisterEndNode from './src/types'

VkRegisterEndNode.install = (app: App): void => {
  app.component(VkRegisterEndNode.name || 'VkRegisterEndNode', VkRegisterEndNode)
}
export {
  VkRegisterEndNode,
}
export default VkRegisterEndNode
