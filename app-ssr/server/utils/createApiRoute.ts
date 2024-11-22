import type express from 'express'
import { createCORSRoute } from './createCORSRoute'
import { readSsrMetaEnv } from './readSsrMetaEnv'

export function createApiRoute (app: express.Express, path: string) {
  const { env } = readSsrMetaEnv()
  const base = env.VITE_API_PREFIX ?? ''

  const router = createCORSRoute()

  app.use(`${base}${path}`, router)

  return router
}
