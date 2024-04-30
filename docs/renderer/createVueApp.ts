export { createVueApp }

import { createApp, createSSRApp, defineComponent, h, markRaw, nextTick, reactive, ref } from 'vue'
import type { PageContextWithApp, PageContextWithoutApp } from 'vike-vue/dist/types/PageContext'
import type { PageContext } from 'vike/types'
import { setPageContext } from 'vike-vue/usePageContext'
import { objectAssign } from '../vike-vue/utils/objectAssign'

import { contentUpdatedCallbacks, ContentUpdatedCallbackHook } from './page'




async function createVueApp (
  pageContext: PageContext,
  ssr: boolean,
  rootComponentName: 'Head' | 'Page',
): Promise<PageContextWithApp> {
  const rootComponentRef = ref(markRaw(pageContext.config[rootComponentName]))
  const layoutRef = ref(markRaw(pageContext.config.Layout))


  const runCbs = (hook: ContentUpdatedCallbackHook) => {
    contentUpdatedCallbacks
      .filter((obj) => obj.hook === hook)
      .forEach((obj) => obj.callback(pageContext))
  }

  const PageWithLayout = defineComponent({
    render () {

      const propsWithHooks = {
        onVnodeMounted: () => runCbs('mounted'),
        onVnodeUpdated: () => runCbs('updated'),
        onVnodeUnmounted: () => runCbs('unmounted'),
        onVnodeBeforeUnmount: () => runCbs('beforeUnmount'),
      }

      if (!!layoutRef.value && rootComponentName === 'Page') {
        // Wrap <Page> with <Layout>
        return h(
          layoutRef.value,
          {}, 
          { 
            default: () => h(
              rootComponentRef.value, propsWithHooks,
            ), 
          })
      } else {
        return h(rootComponentRef.value)
      }
    },
  })

  const app = ssr ? createSSRApp(PageWithLayout) : createApp(PageWithLayout)

  // We use `app.changePage()` to do Client Routing, see `onRenderClient.ts`
  objectAssign(app, {
    changePage: async (pageContext: PageContext) => {
      let returned = false
      let err: unknown
      app.config.errorHandler = (err_) => {
        if (returned) {
          // eslint-disable-next-line no-console
          console.error(err_)
        } else {
          err = err_
        }
      }
      Object.assign(pageContextReactive, pageContext)
      rootComponentRef.value = markRaw(pageContext.config[rootComponentName])
      layoutRef.value = markRaw(pageContext.config.Layout)
      await nextTick()
      returned = true
      if (err) throw err
    },
  })

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `onRenderClient.ts`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext as PageContextWithoutApp)

  objectAssign(pageContext, { app })
  const pageContextWithApp = pageContext as PageContextWithApp

  pageContextWithApp.config.onCreateAppPinia?.(pageContext)
  pageContextWithApp.config.onCreateAppVueQuery?.(pageContext)

  await pageContextWithApp.config.onCreateApp?.(pageContext)

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive)

  return pageContextWithApp
}
