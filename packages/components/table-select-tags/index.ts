import { App } from 'vue'
import SkTableSelectTags from './src/index.vue'
export * as __SkTableSelectTags from './src/types'

SkTableSelectTags.install = (app: App): void => {
  app.component(SkTableSelectTags.name, SkTableSelectTags)
}
export {
  SkTableSelectTags,
}
export default SkTableSelectTags
