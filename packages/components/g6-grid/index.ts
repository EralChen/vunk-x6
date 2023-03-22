import { App } from 'vue'
import SkG6Grid from './src/index.vue'
export * as __SkG6Grid from './src/types'

SkG6Grid.install = (app: App): void => {
  app.component(SkG6Grid.name, SkG6Grid)
}
export {
  SkG6Grid,
}
export default SkG6Grid
