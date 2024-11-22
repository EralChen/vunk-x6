import mri from 'mri'
import { loadEnv } from 'vite'
import { appRoot } from '../../path.config'

interface MriData {
  mode: string
}

function loadSsrMetaEnv () {
  const argv = process.argv.slice(2)
  const mriData = mri<MriData>(argv)
  const isProduction = process.env.NODE_ENV === 'production'
  const mode = mriData.mode || (
    isProduction ? 'production' : 'development'
  )
  const env = loadEnv(mode, appRoot, '') as SsrMetaEnv
  return {
    env,
    mode,
    isProduction,
  }
}

export const readSsrMetaEnv = loadSsrMetaEnv
