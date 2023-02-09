import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { windowEnvPlugin, vunkPresetsTheme } from '@lib-env/app-utils'
import { getEnv } from '@lib-env/app-utils'
import path from 'path'
import { appRoot } from '@lib-env/path'
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
    
    
        theme: {
          colors: {
            primary: 'var(--el-color-primary)',
            success: 'var(--el-color-success)',
            warning: 'var(--el-color-warning)',
            danger: 'var(--el-color-danger)',
            info: 'var(--el-color-info)',

            white: 'var(--el-color-white)',
            black: 'var(--el-color-black)',
         
            

            text: {
              primary: 'var(--el-text-color-primary)',
              secondary: 'var(--el-text-color-secondary)',
              tertiary: 'var(--el-text-color-tertiary)',
              placeholder: 'var(--el-text-color-placeholder)',
              disabled: 'var(--el-text-color-disabled)',
            },


            border: {
              base: 'var(--el-border-color)',
              light: 'var(--el-border-color-light)',
              lighter: 'var(--el-border-color-lighter)',
              extraLight: 'var(--el-border-color-extra-light)',
              dark: 'var(--el-border-color-dark)',
              darker: 'var(--el-border-color-darker)',
            },

    
            fill: {
              base: 'var(--el-fill-color)',
              light: 'var(--el-fill-color-light)',
              lighter: 'var(--el-fill-color-lighter)',
              extraLight: 'var(--el-fill-color-extra-light)',
              dark: 'var(--el-fill-color-dark)',
              darker: 'var(--el-fill-color-darker)',
              blank: 'var(--el-fill-color-blank)',
            },

            bg: {
              base: 'var(--el-bg-color)',
              page: 'var(--el-bg-color-page)',
              overlay: 'var(--el-bg-color-overlay)',
            },

          },
        },
      }),
      // legacy({
      //   modernPolyfills: ['esnext.array.at'],
      // }),
      viteExternalsPlugin(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(srcRoot,'./icons/svg')],
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
