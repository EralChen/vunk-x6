import { App } from 'vue'
import SkTenantTablesSelect from './src/index.vue'
export * as __SkTenantTablesSelect from './src/types'

SkTenantTablesSelect.install = (app: App): void => {
  app.component(SkTenantTablesSelect.name, SkTenantTablesSelect)
}
export {
  SkTenantTablesSelect,
}
export default SkTenantTablesSelect
