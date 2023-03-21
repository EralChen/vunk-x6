import { App } from 'vue'
import SkG6ToolBar from './src/index.vue'
export * as __SkG6ToolBar from './src/types'

SkG6ToolBar.install = (app: App): void => {
  app.component(SkG6ToolBar.name, SkG6ToolBar)
}
export {
  SkG6ToolBar,
}
export default SkG6ToolBar
