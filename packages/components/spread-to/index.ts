import { App } from 'vue'
import VkSpreadTo from './src/index.vue'
export * as __VkSpreadTo from './src/types'

VkSpreadTo.install = (app: App): void => {
  app.component(VkSpreadTo.name, VkSpreadTo)
}
export {
  VkSpreadTo,
}
export default VkSpreadTo
