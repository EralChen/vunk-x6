import type { App } from 'vue'
import VkSelection from './src/index.vue'

export * as __VkSelection from './src/types'

VkSelection.install = (app: App): void => {
  app.component(VkSelection.name || 'VkSelection', VkSelection)
}
export {
  VkSelection,
}
export default VkSelection
