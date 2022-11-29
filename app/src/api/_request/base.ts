import { RestFetch } from '@vunk/skzz/shared/utils-fetch'
import type { R } from '@vunk/skzz/shared'
import { usePlatformStore } from '@/stores/platform'
import { AnyFunc } from '@vunk/core'

export const restFetch = new RestFetch({
  baseURL: '',
  DEV: import.meta.env.DEV,
})

export function withPlatform <T extends AnyFunc> (fn: T) {
  return (async (...args) => {
    const platformStore = usePlatformStore()
    const platform = platformStore.getPlatformInfo()
    restFetch.baseURL = platform.url
    return fn(...args)
  }) as T
}

const baseRequest = async <T>(...args: Parameters<typeof restFetch.request>) => {
  const data = await restFetch.request<R<T>>(...args)
  return data 
}

export const request = withPlatform(baseRequest)

