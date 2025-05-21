import type { App } from 'vue'
import VkDndItem from './src/index.vue'

export * as __VkDndItem from './src/types'

VkDndItem.install = (app: App): void => {
  app.component(VkDndItem.name || 'VkDndItem', VkDndItem)
}
export {
  VkDndItem,
}
export default VkDndItem
