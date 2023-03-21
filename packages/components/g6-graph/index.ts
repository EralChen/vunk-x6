import { App } from 'vue'
import SkG6Graph from './src/index.vue'
export * as __SkG6Graph from './src/types'

SkG6Graph.install = (app: App): void => {
  app.component(SkG6Graph.name, SkG6Graph)
}
export {
  SkG6Graph,
}
export default SkG6Graph
