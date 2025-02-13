import { App } from 'vue'
import VkPort from './src/index.vue'
export * as __VkPort from './src/types'

VkPort.install = (app: App): void => {
  app.component(VkPort.name || 'VkPort', VkPort)
}
export {
  VkPort,
}
export default VkPort
