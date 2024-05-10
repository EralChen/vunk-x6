import express from 'express'


/**
 * @description
 * '/test' 路由
 */
const router = express.Router()

router.get('/', (req, res, next) => {
  if (req.query.name) {
    res.json({
      name: req.query.name,
    })
  } else {
    next(new Error('no name provided'))
  }
})

export default router