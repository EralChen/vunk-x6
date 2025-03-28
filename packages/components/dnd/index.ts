import type { App } from 'vue'
import { VkDndItem } from '@vunk-x6/components/dnd-item'
import VkDnd from './src/index.vue'

export * as __VkDnd from './src/types'

VkDnd.install = (app: App): void => {
  app.component(VkDnd.name || 'VkDnd', VkDnd)
}
export {
  VkDnd,
  VkDndItem,
}
export default VkDnd
