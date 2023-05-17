import { App } from 'vue'
import SkIncreaseButton from './src/index.vue'
export * as __SkIncreaseButton from './src/types'

SkIncreaseButton.install = (app: App): void => {
  app.component(SkIncreaseButton.name, SkIncreaseButton)
}
export {
  SkIncreaseButton,
}
export default SkIncreaseButton
