import { appRoot, workRoot } from '@lib-env/path'
import { taskWithName, run } from '@lib-env/shared'
import { series, dest, src } from 'gulp'
import path from 'path'


const appPublicDir  = path.resolve(appRoot, 'public')
const assetsDir = path.resolve(workRoot, './node_modules/@arcgis/core/assets')

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
  taskWithName('addThemes', async () => {

    src(
      path.resolve(appPublicDir, 'Esri/esri/themes/**/*'),
    ).pipe(
      dest(path.resolve(appRoot, 'src/styles/esri/_themes')),
    )
  }),
])
