import { App } from 'vue'
import VkNodeCard from './src/index.vue'
export * as __VkNodeCard from './src/types'

VkNodeCard.install = (app: App): void => {
  app.component(VkNodeCard.name || 'VkNodeCard', VkNodeCard)
}
export {
  VkNodeCard,
}
export default VkNodeCard
