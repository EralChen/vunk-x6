import { App } from 'vue'
import SkAppIcon from './src/index.vue'
export * as __SkAppIcon from './src/types'

SkAppIcon.install = (app: App): void => {
  app.component(SkAppIcon.name, SkAppIcon)
}
export {
  SkAppIcon,
}
export default SkAppIcon
