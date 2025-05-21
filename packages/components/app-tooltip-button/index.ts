import { App } from 'vue'
import VkAppTooltipButton from './src/index.vue'
export * as __VkAppTooltipButton from './src/types'

VkAppTooltipButton.install = (app: App): void => {
  app.component(VkAppTooltipButton.name || 'VkAppTooltipButton', VkAppTooltipButton)
}
export {
  VkAppTooltipButton,
}
export default VkAppTooltipButton
