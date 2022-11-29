import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

import { VkSvgIcon } from '@vunk/core'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import 'uno.css'
import './styles'
import './permission'


createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component('SvgIcon', VkSvgIcon)
  .mount('#app')
