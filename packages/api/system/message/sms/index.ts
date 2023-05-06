import { request } from '@skzz-template/shared/fetch/platform'
import { Pagination } from '@skzz-template/shared'
import { MESSAGE_DATA } from '../const'
import { QueryRData } from '@vunk/skzz'
import { Sms, CSms } from './types'
/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73489189 查询
 * @param pagination 
 * @returns 
 */
export const rSmsList = (pagination?: Pagination, data?: Partial<CSms>) => {
  return request<[QueryRData<Sms>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': ['1.3'],
      'condition': {
        '1.3': {
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73095993 新增
 * https://www.apifox.cn/link/project/2475837/apis/api-73096093 修改
 * @param data 
 * @param u
 */
export const cuSms = (data: CSms, u = false) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [{
        'datasetId': '1.3',
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73096106 删除
 * @param id 
 * @returns 
 */
export const dSms = (id: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [{
        'datasetId': '1.3',
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

export * from './types'