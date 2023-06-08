import { App } from 'vue'
import SkUpload from './src/index.vue'
export * as __SkUpload from './src/types'

SkUpload.install = (app: App): void => {
  app.component(SkUpload.name, SkUpload)
}
export {
  SkUpload,
}
export default SkUpload
