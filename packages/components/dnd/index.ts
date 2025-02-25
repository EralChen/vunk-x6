import { App } from 'vue'
import VkDnd from './src/index.vue'
export * as __VkDnd from './src/types'

VkDnd.install = (app: App): void => {
  app.component(VkDnd.name || 'VkDnd', VkDnd)
}
export {
  VkDnd,
}
export default VkDnd
