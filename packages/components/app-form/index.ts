import { App } from 'vue'
import SkAppForm from './src/index.vue'
export * as __SkAppForm from './src/types'
export * as _SkAppFormCtx from './src/ctx'

SkAppForm.install = (app: App): void => {
  app.component(SkAppForm.name, SkAppForm)
}
export {
  SkAppForm,
}
export default SkAppForm
