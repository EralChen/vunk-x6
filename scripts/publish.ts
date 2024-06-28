import {series} from 'gulp'
import fsp from 'fs/promises'
import path from 'path'
import { entryPackage, distDir } from '@lib-env/path'

import { gulpTask } from '@vunk/shared/function'
import { run } from '@vunk/shared/node/process'
import { readJsonSync, writeJsonSync } from '@vunk/shared/node/fs'

export default series(
  gulpTask('update:vision', async () => {

    const fileObj = readJsonSync(entryPackage) as { version: string; module: string }
    
    // 默认小版本+1
    const versionList = fileObj.version.split('.')
    const sVersion = versionList.at(-1)
    if (sVersion) {
      versionList[versionList.length - 1] = +sVersion + 1 + ''
    }
    fileObj.version = versionList.join('.')
 
    writeJsonSync(entryPackage, fileObj, 2)

  }),
  gulpTask('destPkg', async () => {
    const distPkgFile = path.resolve(distDir, './package.json')

    await fsp.cp(
      entryPackage,
      distPkgFile,
    )
    // 处理 pkg
    const jsonObj = readJsonSync(distPkgFile) as { module: string, main: string }
    jsonObj.module = 'index.esm.js'
    jsonObj.main = 'index.esm.js'

    writeJsonSync(distPkgFile, jsonObj, 2)
    
  }),
  
  gulpTask('publish', async () => {
    run(
      'npm publish --tag alpha --registry https://registry.npmjs.org --access public',
      distDir,
    )
  }),
)
