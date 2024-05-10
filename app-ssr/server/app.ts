import express, { ErrorRequestHandler } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mri from 'mri'
import httpErrors from 'http-errors'
import path from 'path'
import { serverRoot, appRoot } from '../path.config'
import { renderPage } from 'vike/server'
import { loadEnv, createServer } from 'vite'

import testRouter from './routes/test'
import usersRouter from './routes/users'


interface MriData {
  mode: string
}
const argv = process.argv.slice(2)
const mriData = mri<MriData>(argv)
const isProduction = process.env.NODE_ENV === 'production'


export async function createApp () {

  const app = express()

  if (isProduction) {
    app.use(express.static(`${appRoot}/dist/client`))
  } else {
    const mode = mriData.mode || 'development'
    const env = loadEnv(mode, appRoot, '') as SsrMetaEnv
    const port = env.SERVER_HMR_PORT ?? 24678


    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const viteDevMiddleware = (
      await createServer({
        root: appRoot,
        server: { middlewareMode: true, hmr: { port } },
      })
    ).middlewares

    app.use(viteDevMiddleware)
  }


  // view engine setup
  app.set('views', path.join(serverRoot, 'views'))
  app.set('view engine', 'pug')

  // 开启日志
  app.use(morgan('dev'))
  // 处理 application/json 格式的请求体
  app.use(express.json())
  // 处理 application/x-www-form-urlencoded 格式的请求体
  app.use(express.urlencoded({ extended: false }))
  // 解析所有传入请求的cookie，并将它们存储在req.cookies对象中
  app.use(cookieParser())
  // 设置静态资源目录
  app.use(express.static(path.join(serverRoot, 'public')))



  app.use('/test', testRouter)

  app.use('/users', usersRouter)

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.all('*', async (req, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    if (!httpResponse) {
      return next()
    } else {
      const { statusCode, headers } = httpResponse
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode)
      httpResponse.pipe(res)
    }
  })


  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(httpErrors(404))
  })



  // error handler
  function errorHandler (
    err: httpErrors.HttpError,
    req: express.Request, 
    res: express.Response, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: express.NextFunction,
  ) {
  // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  }
  app.use(errorHandler as ErrorRequestHandler)


  return app

}


