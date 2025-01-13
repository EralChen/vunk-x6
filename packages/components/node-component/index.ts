import { App } from 'vue'
import VkNodeComponent from './src/index.vue'
export * as __VkNodeComponent from './src/types'

VkNodeComponent.install = (app: App): void => {
  app.component(VkNodeComponent.name || 'VkNodeComponent', VkNodeComponent)
}
export {
  VkNodeComponent,
}
export default VkNodeComponent
