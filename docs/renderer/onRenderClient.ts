// https://vike.dev/onRenderClient
export { onRenderClient }

import { createVueApp } from './app'
import { getTitle } from '../vike-vue/renderer/getTitle'
import type { OnRenderClientAsync } from 'vike/types'
import { useCopyCode } from '#/vitepress/composables/copy-code'



let app: ReturnType<typeof createVueApp>

// 初始化代码复制功能
useCopyCode()

const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!app) {
    // First rendering/hydration

    const container = document.getElementById('page-view')!
    const ssr = container.innerHTML !== ''
    app = createVueApp(pageContext, ssr)
    if (pageContext.config.vuePlugins) {
      pageContext.config.vuePlugins.forEach(({ plugin, options }) => {
        app.use(plugin, options)
      })
    }
    app.mount(container)
  } else {
    // Client routing
    // See https://vike.dev/server-routing-vs-client-routing

    await app.changePage(pageContext)

    // Get the page's `title` config value, which may be different from the
    // previous page. It can even be null, in which case we should unset the
    // document title.
    const title = getTitle(pageContext)
    document.title = title || ''
  }
}
