import { createApp } from '../app'
import debuger from 'debug'
import http from 'http'
import mri from 'mri'
import { appRoot } from '../../path.config'
import { loadEnv } from 'vite'
import consola from 'consola'

interface MriData {
  mode: string
}

const argv = process.argv.slice(2)
const mriData = mri<MriData>(argv)
const debug = debuger('http')
const env = loadEnv(mriData.mode, appRoot, '') as SsrMetaEnv
const port = normalizePort(env.SERVER_PORT ?? 3000) 



createServer()

async function createServer () {
  const app = await createApp()

  // https://www.npmjs.com/package/debug#windows-command-prompt-notes

  const server = http.createServer(app)

  server.listen(port)
  server.on('error', onError)
  server.on('listening', () => listeningHandler(server))
  
}



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val: string | number) {
  const port = parseInt(val + '', 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    consola.error(bind + ' requires elevated privileges')
    process.exit(1)
  case 'EADDRINUSE':
    consola.error(bind + ' is already in use')
    process.exit(1)
  default:
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function listeningHandler (server: http.Server) {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port

  debug('Listening on ' + bind)
  debug(`http://localhost:${port}`)
  
}
