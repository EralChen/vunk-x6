import { App } from 'vue'
import SkRoleTreesSelect from './src/index.vue'
export * as __SkRoleTreesSelect from './src/types'

SkRoleTreesSelect.install = (app: App): void => {
  app.component(SkRoleTreesSelect.name, SkRoleTreesSelect)
}
export {
  SkRoleTreesSelect,
}
export default SkRoleTreesSelect
