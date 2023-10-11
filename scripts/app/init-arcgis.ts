import { appRootDirs, workRoot } from '@lib-env/path'
import { taskWithName, run } from '@lib-env/shared'
import { series, dest, src } from 'gulp'
import path from 'path'



const assetsDir = path.resolve(workRoot, './node_modules/@arcgis/core/assets')

const tasks = appRootDirs.map(appRoot => {
  const appPublicDir  = path.resolve(appRoot, 'public')
  return [
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
  ]
}).flat(1)

export default series(tasks)


// function copyFiles (srcDir: string, destDir: string) {
//   const files = fs.readdirSync(srcDir)
//   for (const file of files) {
//     const srcPath = path.join(srcDir, file)
//     const destPath = path.join(destDir, file)
//     if (fs.statSync(srcPath).isDirectory()) {
//       fs.mkdirSync(destPath, { recursive: true })
//       copyFiles(srcPath, destPath)
//     } else {
//       fs.copyFileSync(srcPath, destPath)
//     }
//   }
// }
