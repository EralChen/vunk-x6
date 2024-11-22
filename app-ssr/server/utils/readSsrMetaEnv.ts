import { memoize } from 'lodash-es'
import mri from 'mri'
import { loadEnv } from 'vite'
import { appRoot } from '../../path.config'

interface MriData {
  mode: string
}

export function loadSsrMetaEnv () {
  const argv = process.argv.slice(2)
  const mriData = mri<MriData>(argv)
  const isProduction = process.env.NODE_ENV === 'production'
  const mode = mriData.mode || (
    isProduction ? 'production' : 'development'
  )
  const env = loadEnv(mode, appRoot, '') as SsrMetaEnv

  return env
}

export const readSsrMetaEnv = memoize(loadSsrMetaEnv)
