import { App } from 'vue'
import SkMultipage from './src/index.vue'
export * as __SkMultipage from './src/types'

SkMultipage.install = (app: App): void => {
  app.component(SkMultipage.name, SkMultipage)
}
export {
  SkMultipage,
}
export default SkMultipage
