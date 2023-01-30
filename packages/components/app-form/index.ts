import { App } from 'vue'
import SkAppForm from './src/index.vue'
export * as __SkAppForm from './src/types'

SkAppForm.install = (app: App): void => {
  app.component(SkAppForm.name, SkAppForm)
}
export {
  SkAppForm,
}
export default SkAppForm
