import { App } from 'vue'
import SkAppModule from './src/index.vue'
export * as __SkAppModule from './src/types'

SkAppModule.install = (app: App): void => {
  app.component(SkAppModule.name, SkAppModule)
}
export {
  SkAppModule,
}
export default SkAppModule
