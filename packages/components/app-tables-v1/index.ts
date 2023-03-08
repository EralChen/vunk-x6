import { App } from 'vue'
import SkAppTablesV1 from './src/index.vue'
export * as __SkAppTablesV1 from './src/types'

SkAppTablesV1.install = (app: App): void => {
  app.component(SkAppTablesV1.name, SkAppTablesV1)
}
export {
  SkAppTablesV1,
}
export default SkAppTablesV1
