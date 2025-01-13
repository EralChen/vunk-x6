import { App } from 'vue'
import VkGraph from './src/index.vue'
export * as __VkGraph from './src/types'

VkGraph.install = (app: App): void => {
  app.component(VkGraph.name || 'VkGraph', VkGraph)
}
export {
  VkGraph,
}
export default VkGraph
