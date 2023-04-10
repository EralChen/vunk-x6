import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { MESSAGE_DATA } from '../const'
import { QueryRData } from '@vunk/skzz'
import { CMessageTemplate, MessageTemplate } from './types'

/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73086756 查询
 * @param pagination 
 * @returns 
 */
export const rTemplateList = (pagination?: Pagination, data?: Partial<CMessageTemplate>) => {
  return request<[QueryRData<MessageTemplate>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': ['1.2'],
      'condition': {
        '1.2': {
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
 * https://www.apifox.cn/link/project/2475837/apis/api-73095169 新增
 * https://www.apifox.cn/link/project/2475837/apis/api-73095800 修改
 * @param data 
 * @returns 
 */
export const cuTemplate = (data: CMessageTemplate, u = false) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [
        {
          'datasetId': '1.2',
          'rows': [
            {
              ...data,
              'op': u ? 8 : 4,
            },
          ],
        },
      ],
      ...MESSAGE_DATA,
      'buttonId': u ? 'increase' : 'modify',
    },
  }, {
    msg: u ? '修改成功' : '新增成功',
  })
}

/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73095930 删除
 * @param id 
 * @returns 
 */
export const dTemplate = (id: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [{
        'datasetId': '1.2',
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