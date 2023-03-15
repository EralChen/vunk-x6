import { App } from 'vue'
import SkCheckTag from './src/index.vue'
export * as __SkCheckTag from './src/types'

SkCheckTag.install = (app: App): void => {
  app.component(SkCheckTag.name, SkCheckTag)
}
export {
  SkCheckTag,
}
export default SkCheckTag
