import { App } from 'vue'
import SkAppDialog from './src/index.vue'
export * as __SkAppDialog from './src/types'
export * as _SkAppDialogUse from './src/use'
SkAppDialog.install = (app: App): void => {
  app.component(SkAppDialog.name, SkAppDialog)
}
export {
  SkAppDialog,
}
export default SkAppDialog
