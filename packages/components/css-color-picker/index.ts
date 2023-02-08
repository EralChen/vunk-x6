import { App } from 'vue'
import SkCssColorPicker from './src/index.vue'
export * as __SkCssColorPicker from './src/types'

SkCssColorPicker.install = (app: App): void => {
  app.component(SkCssColorPicker.name, SkCssColorPicker)
}
export {
  SkCssColorPicker,
}
export default SkCssColorPicker
