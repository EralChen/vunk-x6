import { Pagination } from '@skzz-template/shared'
import { request } from '@skzz-template/shared/fetch/platform'
import { RestFetchQueryOptions, QueryRData, RestFetchExecOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { MENU_DATA } from './const'
import { Tenant } from './types'

export const rTenants = (
  query: Partial<Tenant> = {}, 
  pagination?: Pagination,
) => {
  return request<[
    QueryRData<Tenant>
  ]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      datasetIds: ['1'],
      condition: {
        1: {
          ...query,
          ...(pagination ? { pagination } : {}),
        },
      },
      ...MENU_DATA,
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0]
  })
}

export const dTenants = (ids: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '3',
      buttonId: 'remove',
      condition: {
        op: 'remove',
      },

      datas: [
        {
          datasetId: '1',
          rows: ids.map(id => {
            return {
              id,
              op: RestFetchOp.d,
            }
          }),


        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchExecOptions, {
    msg: '删除成功',
  })
}

const cTenant = (data: Partial<Tenant>) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '3',
      condition: {
        op: 'increase',
      },

      datas: [
        {
          datasetId: '1',
          rows: [
            {
              ...data,
              op: RestFetchOp.c,
            },
          ],
        },
      ],

      'buttonId': 'increase',
      ...MENU_DATA,
    },
  } as RestFetchExecOptions, {
    msg: '新增成功',
  })
}

const uTenant = (data: Partial<Tenant>) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '3',
      condition: {
        op: 'modify',
      },

      datas: [
        {
          datasetId: '1',
          rows: [
            {
              ...data,
              op: RestFetchOp.u,
            },
          ],
        },
      ],

      'buttonId': 'modify',
      ...MENU_DATA,
    },
  } as RestFetchExecOptions, {
    msg: '修改成功',
  })
}

export const cuTenant = (data: Partial<Tenant>) => {
  const op = data.id ? RestFetchOp.u : RestFetchOp.c

  if (op === RestFetchOp.c)  {
    return cTenant(data)
  } else {
    return uTenant(data)
  }

}

export * from './types'
