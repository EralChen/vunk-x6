import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { RestFetchQueryOptions, QueryRData, RestFetchSaveOptions } from '@vunk/skzz'
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
    url: '/core/busi/save',
    data: {
 
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
  } as RestFetchSaveOptions, {
    msg: '删除角色成功',
  })
}

export const cuTenant = (data: Partial<Tenant>) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [
        {
          datasetId: '1',
          rows: [
            {
              ...data,
              op: data.id ? RestFetchOp.u : RestFetchOp.c,
            },
          ],
        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions, {
    msg: data.id ? '修改角色成功' : '新增角色成功',
  })
}
