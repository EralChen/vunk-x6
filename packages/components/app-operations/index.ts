import { App } from 'vue'
import SkAppOperations from './src/index.vue'
export * as __SkAppOperations from './src/types'

SkAppOperations.install = (app: App): void => {
  app.component(SkAppOperations.name, SkAppOperations)
}
export {
  SkAppOperations,
}
export default SkAppOperations
