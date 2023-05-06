import { request } from '@skzz-template/shared/fetch/platform'
import { Pagination } from '@skzz-template/shared'
import { MESSAGE_DATA } from '../const'
import { QueryRData } from '@vunk/skzz'
import { Weixin, CWeixin } from './types'


const datasetId = '1.5'
/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73086868 查询
 * @param pagination 
 * @returns 
 */
export const rWeixinList = (pagination?: Pagination, data?: Partial<CWeixin>) => {
  return request<[QueryRData<Weixin>]>({
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73098765 新增
 * https://www.apifox.cn/link/project/2475837/apis/api-73098911 修改
 * @param data 
 * @param u
 */
export const cuWeixin = (data: CWeixin, u = false) => {
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73098930 删除
 * @param id 
 * @returns 
 */
export const dWeixin = (id: string) => {
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