import { App } from 'vue'
import SkG6Render from './src/index.vue'
export * as __SkG6Render from './src/types'

SkG6Render.install = (app: App): void => {
  app.component(SkG6Render.name, SkG6Render)
}
export {
  SkG6Render,
}
export default SkG6Render
