import type { R, RestFetchRequest } from '@vunk/skzz/shared'
import { RestFetch } from '@vunk/skzz/shared/utils-fetch'

export const restFetch  = new RestFetch({
  baseURL: '',
  DEV: true,
})

export const request = <T>(...args: Parameters<RestFetchRequest>) => {
  return restFetch.request(...args) as Promise<R<T>>
}