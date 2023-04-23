import { MENU_DATA } from '../const'
import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { QueryRData } from '@vunk/skzz'

export const rInstanceList = (pagination: Pagination, flowId: string) => {
  return request<[QueryRData<any>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [
        '10',
      ],
      'condition': {
        '1': {
          'flowId': flowId,
          ...(pagination ? { pagination } : {}),
        },
      },
      ...MENU_DATA,
      'buttonId': 'search',
    },
  }).then(res => {
    return res.datas[0]
  })
}
