import fs from 'node:fs'
import KoaRouter from '@koa/router'
import { CatchErrorMiddleware, middleware, restFetch } from '@vunk/server'
import consola from 'consola'
import Koa from 'koa'
import KoaBodyParsers from 'koa-body-parsers'
import { loadEnvMeta } from './utils/loadEnv'
import DownloadView from './views/download'
import FileView from './views/file'
import UploadView from './views/upload'

const { env } = loadEnvMeta()
restFetch.baseURL = env.VITE_BASE_API
consola.info('restFetch.baseURL', restFetch.baseURL)

const app = new Koa()
const router = new KoaRouter()

KoaBodyParsers(app)

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'x-requested-with'])
  await next()
})
app.use(CatchErrorMiddleware)
app.use(middleware(UploadView))

router.post('/upload', middleware(UploadView))
router.get('/file', middleware(FileView))
router.get('/download/:id', middleware(DownloadView))

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
