import type { Config } from 'vike/types'

import ElmentPlus from 'element-plus'
import { VkClientOnly } from '@vunk/core/components/client-only'

import VpDemo from '../vitepress/components/vp-demo.vue'




const config = {
  vuePlugins: [
    {
      plugin: (app) => {
        app.use(ElmentPlus)
        app.component('Demo', VpDemo)
        app.component('ClientOnly', VkClientOnly)

      },
    },
  ],
} satisfies Config


export default config.vuePlugins