import { App } from 'vue'
import SkMultipageTemplate from './src/index.vue'
export * as __SkMultipageTemplate from './src/types'

SkMultipageTemplate.install = (app: App): void => {
  app.component(SkMultipageTemplate.name, SkMultipageTemplate)
}
export {
  SkMultipageTemplate,
}
export default SkMultipageTemplate
