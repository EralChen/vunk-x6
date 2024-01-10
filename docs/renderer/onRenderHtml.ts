// https://vike.dev/onRenderHtml
export { onRenderHtml }

import { renderToNodeStream, renderToString } from 'vue/server-renderer'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'
import { getTitle } from '../vike-vue/renderer/getTitle'
import type { OnRenderHtmlAsync } from 'vike/types'
import { createVueApp } from './app'
import { App } from 'vue'
import { rCrowdinFilesAsReflect, CrowdinFileLang } from './crowdin'


import '#s/styles'

import 'uno.css'


const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const { stream } = pageContext.config
  const lang = pageContext.lang as CrowdinFileLang


  let pageView: ReturnType<typeof dangerouslySkipEscape> | ReturnType<typeof renderToNodeStream> | string = ''


  pageContext.crowdin = await rCrowdinFilesAsReflect(lang)

  if (!!pageContext.Page) {
    // SSR is enabled
    const app = createVueApp(pageContext)
    if (pageContext.config.vuePlugins) {
      pageContext.config.vuePlugins.forEach(({ plugin, options }) => {
        app.use(plugin, options)
      })
    }
    pageView = !stream
      ? dangerouslySkipEscape(
        await renderToStringWithErrorHandling(app),
      )
      : renderToNodeStreamWithErrorHandling(app)
  }


  const title = getTitle(pageContext)
  const titleTag = !title ? '' : escapeInject`<title>${title}</title>`

  const { description } = pageContext.config
  const descriptionTag = !description ? '' : escapeInject`<meta name="description" content="${description}" />`

  const { favicon } = pageContext.config
  const faviconTag = !favicon ? '' : escapeInject`<link rel="icon" href="${favicon}" />`


  let headHtml: ReturnType<typeof dangerouslySkipEscape> | string = ''
  if (!!pageContext.config.Head) {
    const app = createVueApp(
      pageContext, 
      /*ssrApp*/ true, 
      /*renderHead*/ true,
    )
    headHtml = dangerouslySkipEscape(
      await renderToStringWithErrorHandling(app),
    )
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${lang}'>
      <head>
        <meta charset="UTF-8" />
        ${faviconTag}
        ${titleTag}
        ${descriptionTag}
        ${headHtml}
      </head>
      <body>
        <div id="page-view">${pageView}</div>
      </body>
      <!-- built with https://github.com/vikejs/vike-vue -->
    </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
    },
  }
}

async function renderToStringWithErrorHandling (app: App) {
  let returned = false
  let err: unknown
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    if (returned) {
      // eslint-disable-next-line no-console
      console.error(err_)
    } else {
      err = err_
    }
  }
  const appHtml = await renderToString(app)
  returned = true
  if (err) throw err
  return appHtml
}

function renderToNodeStreamWithErrorHandling (app: App) {
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
  const appHtml = renderToNodeStream(app)
  returned = true
  if (err) throw err
  return appHtml
}


