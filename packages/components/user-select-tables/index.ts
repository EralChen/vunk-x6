import { App } from 'vue'
import SkUserSelectTables from './src/index.vue'
export * as __SkUserSelectTables from './src/types'

SkUserSelectTables.install = (app: App): void => {
  app.component(SkUserSelectTables.name, SkUserSelectTables)
}
export {
  SkUserSelectTables,
}
export default SkUserSelectTables
