import { PluginOption } from 'vite'
import { getEnv } from '../env'

export function windowEnvPlugin (appRoot: string): PluginOption {
  let mode = ''
  
  return {
    configResolved (resolvedConfig) {
      // 存储最终解析的配置
      mode = resolvedConfig.mode
    },

    name: 'window-env-plugin',
    transform (code) {
      if (code.includes('import.meta.env.VITE_')) {
        code = code.replace(/import\.meta\.env\.(VITE_.+)/g, (_, p1) => {
          return `window.__env__.${p1}`
        })
      }
      return code
    },
    transformIndexHtml (html) {
      const obj = getEnv(appRoot, mode)
      Reflect.deleteProperty(obj, 'NODE_ENV')
      // Reflect.deleteProperty(obj, 'VITE_BASE_URL')
      
      return html.replace(`<script id="env"></script>`,
        `<script id="env">
          ${'window.__env__ =' + JSON.stringify(obj, null, 2)}
        </script>`)
    },
  }
}