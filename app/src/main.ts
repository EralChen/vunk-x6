import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import { VkSvgIcon } from '@vunk/core'
import ElementPlus from 'element-plus'

import * as ElIconsVue from '@element-plus/icons-vue'

import 'virtual:svg-icons-register'
import 'uno.css'
// import './permission'
import './styles'

const app = createApp(App)

app.use(store)
  .use(router)
  .use(ElementPlus)
  .component('SvgIcon', VkSvgIcon)
  .mount('#app')

  
for (const [key, component] of Object.entries(ElIconsVue)) {
  app.component(key, component)
}