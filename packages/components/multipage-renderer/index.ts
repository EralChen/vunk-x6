import { App } from 'vue'
import SkMultipageRenderer from './src/index.vue'
export * as __SkMultipageRenderer from './src/types'

SkMultipageRenderer.install = (app: App): void => {
  app.component(SkMultipageRenderer.name, SkMultipageRenderer)
}
export {
  SkMultipageRenderer,
}
export default SkMultipageRenderer
