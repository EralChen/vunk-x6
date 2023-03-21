import { App } from 'vue'
import SkG6Minimap from './src/index.vue'
export * as __SkG6Minimap from './src/types'

SkG6Minimap.install = (app: App): void => {
  app.component(SkG6Minimap.name, SkG6Minimap)
}
export {
  SkG6Minimap,
}
export default SkG6Minimap
