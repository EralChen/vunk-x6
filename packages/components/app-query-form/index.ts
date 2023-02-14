import { App } from 'vue'
import SkAppQueryForm from './src/index.vue'
export * as __SkAppQueryForm from './src/types'

SkAppQueryForm.install = (app: App): void => {
  app.component(SkAppQueryForm.name, SkAppQueryForm)
}
export {
  SkAppQueryForm,
}
export default SkAppQueryForm
