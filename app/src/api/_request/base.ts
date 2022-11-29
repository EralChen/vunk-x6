import { RestFetch } from '@vunk/skzz/shared/utils-fetch'
import type { R } from '@vunk/skzz/shared'
import { usePlatformStore } from '@/stores/platform'

export const restFetch = new RestFetch({
  baseURL: '',
  DEV: import.meta.env.DEV,
})

export const request = async <T>(...args: Parameters<typeof restFetch.request>) => {
  const platformStore = usePlatformStore()
  const platform = platformStore.getPaltformInfo()
  restFetch.baseURL = platform.url

  const data = await restFetch.request<R<T>>(...args)

  return data 
}
