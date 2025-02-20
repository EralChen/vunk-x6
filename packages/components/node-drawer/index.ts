import type { App } from 'vue'
import VkNodeDrawer from './src/index.vue'

export * as __VkNodeDrawer from './src/types'

VkNodeDrawer.install = (app: App): void => {
  app.component(VkNodeDrawer.name || 'VkNodeDrawer', VkNodeDrawer)
}
export {
  VkNodeDrawer,
}
export default VkNodeDrawer
