import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { MESSAGE_DATA } from '../const'
import { QueryRData } from '@vunk/skzz'
import { CMessageConfig, MessageConfig } from './types'
/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73086703 查询
 * @param pagination 
 * @returns 
 */
export const rMessageConfigList = (pagination?: Pagination, data?: Partial<CMessageConfig>) => {
  return request<[QueryRData<MessageConfig>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': ['1.1'],
      'condition': {
        '1.1': {
          ...data,
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73092524 新增
 * https://www.apifox.cn/link/project/2475837/apis/api-73092700 修改
 * @param data 
 * @param u
 */
export const cuMessageConfig = (data: CMessageConfig, u = false) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [{
        'datasetId': '1.1',
        rows: [{
          ...data,
          'op': u ? 8 : 4,
        }],
      }],
      ...MESSAGE_DATA,
      'buttonId': u ? 'modify' : 'increase',
    },
  }, {
    msg: u ? '修改成功！' : '新增成功！',
  })
}


/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73093307 删除
 * @param id 
 * @returns 
 */
export const dMessageConfig = (id: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [{
        'datasetId': '1.1',
        'rows': [
          {
            id,
            'op': 2,
          },
        ],
      }],
      ...MESSAGE_DATA,
      'buttonId': 'remove',
    },
  })
}