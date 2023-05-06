import type { RestFetchRequest } from '@vunk/skzz/shared'
import { RestFetch } from '@vunk/skzz/shared/utils-fetch'

export const restFetch  = new RestFetch({
  baseURL: '',
  DEV: true,

  errHandler (err) {
    
    /**
     * 在 request 出现异常时调用 默认如下
     *   throttle((res) => {
     *       ElMessage({
     *         type: 'error',
     *         message: typeof res === 'string' ? res 
     *           : res?.msg,
     *       })
     *   }, 500, {
     *       trailing: false,
     *   })
     * */ 
    console.log('errHandler', err)
    
  },
})

interface R<T> { // 一个自定义的泛型接口
  data: T
  code: number
  msg: string
}

export const request = <T>(...args: Parameters<RestFetchRequest>) => {
  return restFetch.request(...args) as unknown as Promise<R<T>>
}

