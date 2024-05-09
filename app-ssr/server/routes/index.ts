import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}`)
  } else {
    next(new Error('no name provided'))
  }
})

export default router