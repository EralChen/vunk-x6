import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { windowEnvPlugin, vunkPresetsTheme, vunkPresetsShortcuts, unoThemeColors, getEnv } from '@lib-env/app-utils'
import path from 'path'
import { appRoot, packagesDir } from '@lib-env/path'
// import legacy from '@vitejs/plugin-legacy'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import unocss from 'unocss/vite'
import { presetAttributify, presetWind } from 'unocss'
import { presetFlex, presetFont, presetGap } from 'unocss-preset-vunk'



const srcRoot = path.resolve(appRoot, './src')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = getEnv(mode)
  return {
    base: env.VITE_BASE_URL + '/',
    build: {
      outDir: path.resolve(appRoot,'./dist' + env.VITE_BASE_URL),
    },
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '_v': path.resolve(srcRoot,'./views'),
        '_c': path.resolve(srcRoot,'./components'),
        '@': path.resolve(srcRoot,'.'),
        'esri': '@arcgis/core',
      },
    },

    plugins: [
      vue(),
      vueJSX(),
  
      windowEnvPlugin(),
      unocss({
        presets: [
          presetAttributify(),
          presetWind(),
          presetFont({
            theme: {
              ...vunkPresetsTheme.baseFontSize,
              ...vunkPresetsTheme.namedFontSize,
            },
          }),
          presetGap({
            theme: {
              ...vunkPresetsTheme.baseGap, 
              ...vunkPresetsTheme.namedGap,
            },
          }),
          presetFlex({
            prefix: 'sk',
          }),
        
        ],
        shortcuts: {
          ...vunkPresetsShortcuts,
        },
    
    
        theme: {
          colors: {
            ...unoThemeColors,
           
          },
        },
      }),
      // legacy({
      //   modernPolyfills: ['esnext.array.at'],
      // }),
      viteExternalsPlugin(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(packagesDir,'./icons/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),

    ],

    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  }

})
