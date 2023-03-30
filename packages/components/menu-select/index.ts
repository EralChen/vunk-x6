import { App } from 'vue'
import SkMenuSelect from './src/index.vue'
export * as __SkMenuSelect from './src/types'

SkMenuSelect.install = (app: App): void => {
  app.component(SkMenuSelect.name, SkMenuSelect)
}
export {
  SkMenuSelect,
}
export default SkMenuSelect
