import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { MESSAGE_DATA } from '../const'
import { QueryRData } from '@vunk/skzz'
import { Message } from '../types'

/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73086468
 * @param pagination 
 * @returns 
 */
export const rMessageList = (pagination?: Pagination) => {
  return request<[QueryRData<Message>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': ['1'],
      'condition': {
        '1': {
          ...(pagination ? { pagination } : {}),
        },
      },
      ...MESSAGE_DATA,
      'buttonId': 'search',
    },
  }).then(res => {
    return res.datas[0]
  })
}