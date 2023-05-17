import { RestFetch } from '@vunk/skzz/shared/utils-fetch'
import type { R, RestFetchQueryOptionsData } from '@vunk/skzz/shared'
import { usePlatformStore } from '@skzz-platform/stores/platform'
import { AnyFunc } from '@vunk/core'
import { ButtonId } from '@skzz-platform/shared/enum'


export const restFetch = new RestFetch({
  baseURL: '',
})

// 可以根据平台信息动态修改请求地址
export function withPlatform <T extends AnyFunc> (fn: T) {
  return (async (...args) => {
    const platformStore = usePlatformStore()
    const platform = await platformStore.getPlatformInfo()
    if (platform.url) {
      restFetch.baseURL = platform.url
    }
    return fn(...args)
  }) as T
}

const baseRequest = async <T>(...args: Parameters<typeof restFetch.request>) => {
  const [ options ] = args
  if (options.url === '/core/busi/query') {
    const data = options.data as RestFetchQueryOptionsData
    if (!data.buttonId) { 
      data.buttonId = ButtonId.search
    }
  }

  const data = await restFetch.request<R<T>>(...args)
  if (data.code === 401) {
    window.location.reload()
  }
  return data 
}

// 携带平台信息的请求
export const request = withPlatform(baseRequest)
