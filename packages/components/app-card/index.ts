import { App } from 'vue'
import SkAppCard from './src/index.vue'
export * as __SkAppCard from './src/types'

SkAppCard.install = (app: App): void => {
  app.component(SkAppCard.name, SkAppCard)
}
export {
  SkAppCard,
}
export default SkAppCard
