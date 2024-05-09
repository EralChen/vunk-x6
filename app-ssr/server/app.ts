import express, { ErrorRequestHandler } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import httpErrors from 'http-errors'
import path from 'path'
import { serverRoot } from '../path.config'


const app = express()

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




app.use('/', indexRouter)
app.use('/users', usersRouter)


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


export default app
