import { App } from 'vue'
import SkUserTablesSelect from './src/index.vue'
export * as __SkUserTablesSelect from './src/types'

SkUserTablesSelect.install = (app: App): void => {
  app.component(SkUserTablesSelect.name, SkUserTablesSelect)
}
export {
  SkUserTablesSelect,
}
export default SkUserTablesSelect
