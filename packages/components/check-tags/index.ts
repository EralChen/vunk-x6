import { App } from 'vue'
import SkCheckTags from './src/index.vue'
export * as __SkCheckTags from './src/types'

SkCheckTags.install = (app: App): void => {
  app.component(SkCheckTags.name, SkCheckTags)
}
export {
  SkCheckTags,
}
export default SkCheckTags
