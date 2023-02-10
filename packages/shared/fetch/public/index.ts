import { RestFetch } from '@vunk/core/shared/utils-fetch'

export const restFetchConfig = {
  baseURL: '/data',
}

export const restFetch = new RestFetch({
  baseURL: restFetchConfig.baseURL,
})

export const request = async <T>(...args: Parameters<typeof restFetch.request>) => {
  const data = await restFetch.request(...args)
  return data as T
}


export default request

