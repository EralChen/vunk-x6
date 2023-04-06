import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { MESSAGE_DATA } from '../const'
import { QueryRData } from '@vunk/skzz'
import { MessageConfig } from '../types'
/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73086703
 * @param pagination 
 * @returns 
 */
export const rMessageConfigList = (pagination?: Pagination) => {
  return request<[QueryRData<MessageConfig>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': ['1.1'],
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

/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73092524
 * @param data 
 */
export const cuMessageConfig = (data: MessageConfig) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datasetId': '1.1',
      rows: [{
        ...data,
        'op': 4,
      }],
      ...MESSAGE_DATA,
      'buttonId': 'increase',
    },
  }, {
    msg: '新增成功！',
  })
}