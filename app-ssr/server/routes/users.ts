import express from 'express'

/**
 * @description
 * '/users' 路由
 */
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Users Page')
})

export default router