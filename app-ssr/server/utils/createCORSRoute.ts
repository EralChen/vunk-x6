import cors from 'cors'
import express from 'express'

export function createCORSRoute () {
  const router = express.Router()
  // 处理跨域
  router.use(cors())

  return router
}
