import path from 'node:path'

export const appRoot = path.resolve(__dirname, './')

export const serverRoot = path.resolve(appRoot, './server')
export const clientRoot = path.resolve(appRoot, './client')
