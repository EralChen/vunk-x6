import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { rBtns } from '@skzz-platform/api/basic'
import { MENU_DATA } from './const'
import { BoundUser, User } from './types'
import { NormalObject } from '@vunk/core'

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


/**
 * https://www.apifox.cn/link/project/2475837/apis/api-75383822
 *
 */
export const cBoundUsers = (list: {
  'userId': string,
  'roleId': string,
}[], reset?: boolean) => {
  const rows:NormalObject[]  = list.map(item => {
    return {
      'op': RestFetchOp.c,
      ...item,
    }
  })
  if (reset) {
    rows.unshift({
      op: RestFetchOp.d,
      userId: list[0].userId,
    })
  }
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'buttonId': 'increase',
      'datas': [
        {
          'datasetId': '3',
          rows,
        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions, {
    msg: '绑定成功',
  })
}

export const dBoundUsers = (list: Partial<BoundUser>[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'buttonId': 'increase',
      'datas': [
        {
          'datasetId': '3',
          'rows': list.map(item => {
            return {
              'op': RestFetchOp.d,
              ...item,
            }
          }),
        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions)
}

export const rBoundUsers = (query: Partial<BoundUser>) => {
  return request<[QueryRData<BoundUser>]>({
    method: 'POST',
    url: '/core/busi/query',
    DEV_NAME: 'rBoundUsers',
    data: {
      datasetIds: ['3'],
      condition: {
        3: {
          ...query,
        },
      },
      ...MENU_DATA,
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0]
  })

}


export * from './types'
