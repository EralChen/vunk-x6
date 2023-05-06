import { restFetch } from '@skzz/platform/shared/fetch/platform'
import { RequestInitOptions, RestFetchRequestOptions } from '@vunk/skzz'

restFetch.errHandler = (err) => {
  console.log(err)
}

export const request = (
  options: RestFetchRequestOptions, 
  init?: RequestInitOptions, 
  requestInit?: RequestInit,
) => {
  return restFetch.request(
    options, init, requestInit,
  )
}
