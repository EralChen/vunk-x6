import { App } from 'vue'
import SkAppFormaker from './src/index.vue'
export * as __SkAppFormaker from './src/types'

SkAppFormaker.install = (app: App): void => {
  app.component(SkAppFormaker.name, SkAppFormaker)
}
export {
  SkAppFormaker,
}
export default SkAppFormaker
