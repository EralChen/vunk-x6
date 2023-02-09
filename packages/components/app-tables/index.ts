import { App } from 'vue'
import SkAppTables from './src/index.vue'
export * as __SkAppTables from './src/types'

SkAppTables.install = (app: App): void => {
  app.component(SkAppTables.name, SkAppTables)
}
export {
  SkAppTables,
}
export default SkAppTables
