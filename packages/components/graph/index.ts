import type { App } from 'vue'
import VkGraph from './src/index.vue'

export * as __VkGraph from './src/types'
export { useGraphEmitter, useMousewheelGuardClass } from './src/use'

VkGraph.install = (app: App): void => {
  app.component(VkGraph.name || 'VkGraph', VkGraph)
}
export {
  VkGraph,
}
export default VkGraph
