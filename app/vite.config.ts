import path from 'path'
import { defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { windowEnvPlugin, unocssPreferences } from '@lib-env/app-utils'
import { packagesDir } from '@lib-env/path'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import { appRoot, srcRoot } from './path.config'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
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
      unocssPreferences(),
      // legacy({
      //   modernPolyfills: ['esnext.array.at'],
      // }),
      viteExternalsPlugin(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [
          path.resolve(packagesDir,'./icons/svg'),
          path.resolve(appRoot, './src/icons/svg'),
        ],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),

    ],

    // css: {
    //   postcss: {
    //     plugins: [
    //       {
    //         postcssPlugin: 'internal:charset-removal',
    //         AtRule: {
    //           charset: (atRule) => {
    //             if (atRule.name === 'charset') {
    //               atRule.remove()
    //             }
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
  } as UserConfig

})
