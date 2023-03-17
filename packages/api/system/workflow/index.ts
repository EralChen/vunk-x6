import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions } from '@vunk/skzz'

const MENU_DATA = {
  'dir': 'system',
  'modelId': 'menu',
  'menuId': 'menu',
} as const

export const rWorkflows = (query) => {
  return request<[QueryRData]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [
        '1',
      ],
      'condition': {
        '1': {
          ...query,
        },
      },
      ...MENU_DATA,
      'buttonId': 'search',
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0].rows
  })
}

