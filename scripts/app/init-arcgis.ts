import { appRoot, workRoot } from '@lib-env/path'
import { taskWithName, run } from '@lib-env/shared'
import { series, dest, src } from 'gulp'
import path from 'path'
import fs from 'fs'


const appPublicDir  = path.resolve(appRoot, 'public')
const assetsDir = path.resolve(workRoot, './node_modules/@arcgis/core/assets')

const srcThemesDir = path.resolve(appRoot, 'src/styles/esri/_themes')

export default series([
  taskWithName('clean', async () => {
    await run('rm -rf Esri', appPublicDir)
  }),
  taskWithName('add', async () => {
    src(
      path.resolve(assetsDir, '**/*'),
    ).pipe(
      dest(path.resolve(appPublicDir, 'Esri')),
    )
  }),
  
  taskWithName('cleanThemes', async () => {
    await run('rm -rf src/styles/esri/_themes', appRoot)
  }),

  taskWithName('addThemes', async () => {
    copyFiles(path.resolve(assetsDir, 'esri/themes'), srcThemesDir)
  }),

  taskWithName('resolveThemesFontsPath',  async () => {
    const fontFiles = [
      path.resolve(srcThemesDir, './base/_core.scss'),
      path.resolve(srcThemesDir, './base/fonts/fonts.scss'),
    ]
    const publicPath = '/Esri/esri/themes/base/fonts/fonts/'
    
    // 正则替换路径  $calcite-fonts-path: (.*) !default; => $calcite-fonts-path: '/Esri/esri/themes/base/fonts/fonts/' !default;
    const replacePath = (content: string) => {
      return content.replace(/(\$calcite-fonts-path:)(.*)(!default;)/, `$1 '${publicPath}' $3`)
    }
    
    // 替换文件内容
    fontFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf-8')
      fs.writeFileSync(file, replacePath(content))
    })
      
  }),
])


function copyFiles (srcDir: string, destDir: string) {
  const files = fs.readdirSync(srcDir)
  for (const file of files) {
    const srcPath = path.join(srcDir, file)
    const destPath = path.join(destDir, file)
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyFiles(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
