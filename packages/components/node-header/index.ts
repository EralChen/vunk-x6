import { App } from 'vue'
import VkNodeHeader from './src/index.vue'
export * as __VkNodeHeader from './src/types'

VkNodeHeader.install = (app: App): void => {
  app.component(VkNodeHeader.name || 'VkNodeHeader', VkNodeHeader)
}
export {
  VkNodeHeader,
}
export default VkNodeHeader
