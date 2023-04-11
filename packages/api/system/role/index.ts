import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { NormalObject } from '@vunk/core'
import { RestFetchQueryOptions, QueryRData, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'


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

export const cuRole = (data: {
  id?: string;
  name: string;
  roleId: string;
}) => {
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
          rows: [
            {
              ...data,
              op: data.id ? RestFetchOp.u : RestFetchOp.c,
            },
          ],
        },
      ],
    },
  } as RestFetchSaveOptions, {
    msg: data.id ? '修改角色成功' : '新增角色成功',
  })
}


export const rRolePermission = (query: {
  roleId: string;
}) => {
  return request<[
    QueryRData<{
      'buttonId': string;
      'menuId': string;
      'id': string
  }>
  ]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      menuId: 'role',
      modelId: 'role',
      dir: 'system',
      datasetIds: ['3'],
      condition: {
        3: {
          ...query,
        },
      },
    },
  } as RestFetchQueryOptions).then(res => {
    const doc = res.datas[0].rows
    return doc.reduce((a, c) => {
      
      const returnA = a.find(item => item.menuId === c.menuId)
      if (returnA) {
        returnA.buttonIds.push(c.buttonId)
      } else {
        a.push({
          menuId: c.menuId,
          id: c.id,
          buttonIds: [c.buttonId],
        })
      }
      
      return a
    }, [] as {
      'menuId': string;
      'id': string;
      'buttonIds': string[];
    }[])
  })
}


export interface Role {
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
