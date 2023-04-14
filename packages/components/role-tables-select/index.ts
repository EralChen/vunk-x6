import { App } from 'vue'
import SkRoleTablesSelect from './src/index.vue'
export * as __SkRoleTablesSelect from './src/types'

SkRoleTablesSelect.install = (app: App): void => {
  app.component(SkRoleTablesSelect.name, SkRoleTablesSelect)
}
export {
  SkRoleTablesSelect,
}
export default SkRoleTablesSelect
