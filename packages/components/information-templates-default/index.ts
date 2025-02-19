import type { App } from 'vue'
import VkfInformationTemplatesDefault from './src/index.vue'

export * as __VkfInformationTemplatesDefault from './src/types'

VkfInformationTemplatesDefault.install = (app: App): void => {
  app.component(VkfInformationTemplatesDefault.name || 'VkfInformationTemplatesDefault', VkfInformationTemplatesDefault)
}
export {
  VkfInformationTemplatesDefault,
}
export default VkfInformationTemplatesDefault
