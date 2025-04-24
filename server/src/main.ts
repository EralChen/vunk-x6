import fs from 'node:fs'
import KoaRouter from '@koa/router'
import { CatchErrorMiddleware, middleware, restFetch } from '@vunk/server'
import consola from 'consola'
import Koa from 'koa'
import KoaBodyParsers from 'koa-body-parsers'
import { getEnvironmentContext } from './utils'
import DownloadView from './views/download'
import FileView from './views/file'
import OpenaiInvokeView from './views/openai/invoke'
import UploadView from './views/upload'

const { env } = getEnvironmentContext()
restFetch.baseURL = env.VITE_BASE_API

const app = new Koa()
const router = new KoaRouter()

KoaBodyParsers(app)

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'x-requested-with'])
  await next()
})
app.use(CatchErrorMiddleware)

router.post('/upload', middleware(UploadView))
router.get('/file', middleware(FileView))
router.get('/download/:id', middleware(DownloadView))
router.get('/openai/invoke', middleware(OpenaiInvokeView))

app.use(router.routes()).use(router.allowedMethods())

process.on('unhandledRejection', (err) => {
  // 将错误信息发送到 dist/err.log 文件
  fs.promises.appendFile(
    'dist/err.log',
    `${new Date().toISOString()} - ${err}\n\n`,
  )
})
app.listen(process.env.PORT || 4545, () => {
  consola.info(`Server is running on http://localhost:${process.env.PORT || 4545}`)
})
