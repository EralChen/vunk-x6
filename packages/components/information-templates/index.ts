import { App } from 'vue'
import VkInformationTemplates from './src/index.vue'
export * as __VkInformationTemplates from './src/types'

VkInformationTemplates.install = (app: App): void => {
  app.component(VkInformationTemplates.name || 'VkInformationTemplates', VkInformationTemplates)
}
export {
  VkInformationTemplates,
}
export default VkInformationTemplates
