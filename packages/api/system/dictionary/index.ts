import { request } from '@skzz-platform/shared/fetch/platform'
import { Dictionary } from './types'


export function rDic (type: string) {
  return request<{
    0: {
      rows: Dictionary[]
    }
  }>({
    setRequestInit (config) {
      (config.headers as Headers).set('application', 'platform');
      (config.headers as Headers).set('tenant', 'default')
      return config
    },
    url: '/core/busi/query',
    method: 'POST',
    data: {
      'datasetIds': ['1'],
      'condition': { '1': { 'type': type } },
      'dir': 'system',
      'modelId': 'constant',
      'menuId': 'constant',
      'buttonId': 'search',
    },
  }).then(res => {
    return res.datas[0].rows
  })
}

export * from './types'