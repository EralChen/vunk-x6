import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { NormalObject } from '@vunk/core'
import { RestFetchQueryOptions, QueryRData, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'

interface Role {
  roleId: string;
  founder: string;
  memo?: string;
  founderName: string;
  lv: number;
  updateTime: string;
  orgId: string;
  updater: string;
  foundTime: string;
  name: string;
  updaterName: string;
  id: string;
  isSys?: unknown;
  seq: number;
}
export const rRoles = (
  query: NormalObject = {}, 
  pagination?: Pagination,
) => {
  return request<[
    QueryRData<Role>
  ]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      menuId: 'role',
      modelId: 'role',
      dir: 'system',
      datasetIds: ['1'],
      condition: {
        1: {
          ...query,
          ...(pagination ? { pagination } : {}),
        },
      },
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0]
  })
}

export const dRoles = (ids: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      menuId: 'role',
      modelId: 'role',
      dir: 'system',
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
      
    },
  } as RestFetchSaveOptions, {
    msg: '删除角色成功',
  })
}
