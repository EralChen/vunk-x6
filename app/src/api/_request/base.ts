import { RestFetch } from '@vunk/skzz/shared/utils-fetch'
import type { R } from '@vunk/skzz/shared'

export const restFetch = new RestFetch({
  baseURL: import.meta.env.VITE_BASE_API,
  DEV: import.meta.env.DEV,
})

export const request = async <T>(...args: Parameters<typeof restFetch.request>) => {
  const data = await restFetch.request<R<T>>(...args)
  return data 
}
