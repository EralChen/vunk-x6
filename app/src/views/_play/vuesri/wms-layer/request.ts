import { RestFetchRequestOptions } from '@vunk/core'
import { RestFetch } from '@vunk/core/shared/utils-fetch'
export const geoserver = 'http://192.168.110.250:8080/geoserver'

const restFetch = new RestFetch({
  baseURL: geoserver,
  setRequestInit (config) {
    const headers = config.headers as Headers
    // headers.set('Authorization', 'Basic ' + window.btoa('skzzdev'))
    return config
  },
})

const request = <T = any>(options: RestFetchRequestOptions) => {
  return restFetch.request(options) as Promise<T> 
}

export const rLayers = () => {
  return request<{
    layers: {
      layer: {name: string}[]
    }
  }>({
    method: 'GET',
    url: '/rest/layers.json',
  }).then(res => {
    return res.layers.layer
  })
}
