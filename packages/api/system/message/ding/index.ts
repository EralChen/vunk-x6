import { request } from '@skzz-template/shared/fetch/platform'
import { Pagination } from '@skzz-template/shared'
import { MESSAGE_DATA } from '../const'
import { QueryRData } from '@vunk/skzz'
import { Ding, CDing } from './types'


const datasetId = '1.4'
/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73086851 查询
 * @param pagination 
 * @returns 
 */
export const rDingList = (pagination?: Pagination, data?: Partial<CDing>) => {
  return request<[QueryRData<Ding>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [datasetId],
      'condition': {
        [datasetId]: {
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73096155 新增
 * https://www.apifox.cn/link/project/2475837/apis/api-73098651 修改
 * @param data 
 * @param u
 */
export const cuDing = (data: CDing, u = false) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [{
        'datasetId': datasetId,
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73098691 删除
 * @param id 
 * @returns 
 */
export const dDing = (id: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [{
        'datasetId': datasetId,
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