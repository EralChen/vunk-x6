import express from 'express'
import { createApiRoute } from '../utils/createApiRoute'


export default function (
  app: express.Express,
) {
  const router = createApiRoute(app, '/test')

  router.get('/', (req, res) => {
    res.json({
      name: 'test',
    })
  })
  
  return router
}
