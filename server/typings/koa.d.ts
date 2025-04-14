import type { NormalObject } from '@vunk/shared'
import type { Buffer } from 'node:buffer'

declare module 'koa' {
  interface Request {
    body: () => Promise<NormalObject>
  }

  interface Response {
    /**
     * Write 100-continue response
     * Used with Expect: 100-continue header
     */
    writeContinue: () => void
  }
}
export {}
