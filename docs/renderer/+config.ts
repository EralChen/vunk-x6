export { config }

import type { Config, ConfigEffect } from 'vike/types'

// Depending on the value of `config.meta.ssr`, set other config options' `env`
// accordingly.
// See https://vike.dev/meta#:~:text=Modifying%20the%20environment%20of%20existing%20hooks
const toggleSsrRelatedConfig: ConfigEffect = ({ configDefinedAt, configValue }) => {
  if (typeof configValue !== 'boolean') {
    throw new Error(`${configDefinedAt} should be a boolean`)
  }

  return {
    meta: {
      // When the SSR flag is false, we want to render the page only in the
      // browser. We achieve this by then making the `Page` implementation
      // accessible only in the client's renderer.
      Page: {
        env: configValue
          ? { server: true, client: true } // default
          : { client: true },
      },
    },
  }
}

const config = {
  name: 'vike-vue',
  
  onRenderHtml: 'import:./onRenderHtml.ts:onRenderHtml',
  onRenderClient: 'import:./onRenderClient.ts:onRenderClient',


  passToClient: ['pageProps', 'title', 'crowdin', 'lang',  'fromHtmlRenderer'],

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,
  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true },
    },
    Layout: {
      env: { server: true, client: true },
    },
    title: {
      env: { server: true, client: true },
    },
    favicon: {
      env: { server: true, client: true },
    },
    lang: {
      env: { server: true, client: true },
    },
    ssr: {
      env: { config: true },
      effect: toggleSsrRelatedConfig,
    },
    stream: {
      env: { server: true },
    },
    vuePlugins: {
      // List of vue plugins to be installed with app.vue() in onRenderHtml and
      // onRenderClient. We make this config available both on the server and
      // the client always, but if SSR is disabled, onRenderHtml won't make use
      // of it.
      env: { server: true, client: true },
    },
    onCreateApp: {
      env: { server: true, client: true },
    },
    onCreateAppPinia: {
      env: { server: true, client: true },
    },
    onCreateAppVueQuery: {
      env: { server: true, client: true },
    },
    onAfterRenderSSRApp: {
      env: { server: true },
    },
    onAfterRenderSSRAppPinia: {
      env: { server: true },
    },
    onAfterRenderSSRAppVueQuery: {
      env: { server: true },
    },
    onBeforeMountApp: {
      env: { server: false, client: true },
    },
    onBeforeMountAppPinia: {
      env: { server: false, client: true },
    },
    onBeforeMountAppVueQuery: {
      env: { server: false, client: true },
    },
    // Vike already defines the setting 'name', but we redundantly define it here for older Vike versions (otherwise older Vike versions will complain that 'name` is an unknown config).
    name: {
      env: { config: true },
    },
  },
} satisfies Config
