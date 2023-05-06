import { Pagination } from '@skzz-template/shared'
import { request } from '@skzz-template/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { rBtns } from '@skzz-template/api/basic'
import { MENU_DATA } from './const'
import { Constant } from './types'

export const rConstants = (query: Partial<Constant>, pagination: Pagination) => {
  return request<[QueryRData<Constant>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      datasetIds: ['1'],
      condition: {
        '1': {
          ...query,
          ...(pagination ? { pagination } : {}),
        },
      },
      buttonId: 'search',

      ...MENU_DATA,
    },
  } as RestFetchQueryOptions).then(res => {
    const doc = res.datas[0]
    return doc
  })
}

export const rConstantBtns = () => {
  return rBtns(MENU_DATA)
}


export const dConstants = (ids: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '1',
          'rows': ids.map(id => {
            return {
              'id': id,
              'op': RestFetchOp.d,
            }
          },
          ),
        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions, {
    msg: '删除成功',
  })
}

export const cuConstant = (user: Partial<Constant>) => {
  const op = user.id ? RestFetchOp.u : RestFetchOp.c
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '1',
          'rows': [
            {
              ...user,
              op,
            },
          ],
        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions, {
    msg: '保存成功',
  })
}


export * from './types'
