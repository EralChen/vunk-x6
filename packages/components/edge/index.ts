import type { App } from 'vue'
import VkEdge from './src/index.vue'

export * as __VkEdge from './src/types'

VkEdge.install = (app: App): void => {
  app.component(VkEdge.name || 'VkEdge', VkEdge)
}
export {
  VkEdge,
}
export default VkEdge
