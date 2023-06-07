import ElementPlus from 'element-plus'
import Entry from '@skzz/platform'
import VPApp, { NotFound, globals } from '../vitepress'
import { define } from '../utils/types'
import 'uno.css'
import './style.css'
import type { Theme } from 'vitepress'
import '@vunk/core/index.css'
import '@vunk/form/index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
    app.use(Entry)
    app.use(pinia)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
