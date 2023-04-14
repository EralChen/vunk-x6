import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { rBtns } from '@skzz-platform/api/basic'
import { MENU_DATA } from './const'
import { User } from './types'

export const rUsers = (query: Partial<User>, pagination: Pagination) => {
  return request<[QueryRData<User>]>({
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
    doc.rows.forEach(item => {
      item.password = ''
    })
    return doc
  })
}

export const rUserBtns = () => {
  return rBtns(MENU_DATA)
}

export const dUsers = (ids: string[]) => {
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

export const cuUser = (user: Partial<User>) => {
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
