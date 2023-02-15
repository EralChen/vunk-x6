import { RestFetch } from '@vunk/skzz/shared/utils-fetch'
import type { R } from '@vunk/skzz/shared'
import { usePlatformStore } from '@skzz-platform/stores/platform'
import { AnyFunc } from '@vunk/core'


export const restFetch = new RestFetch({
  baseURL: '',
})

// 可以根据平台信息动态修改请求地址
export function withPlatform <T extends AnyFunc> (fn: T) {
  return (async (...args) => {
    const platformStore = usePlatformStore()
    const platform = await platformStore.getPlatformInfo()
    restFetch.baseURL = platform.url
    return fn(...args)
  }) as T
}

const baseRequest = async <T>(...args: Parameters<typeof restFetch.request>) => {
  const data = await restFetch.request<R<T>>(...args)
  return data 
}

// 携带平台信息的请求
export const request = withPlatform(baseRequest)
