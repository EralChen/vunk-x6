import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { NormalObject } from '@vunk/core'
import { RestFetchQueryOptions, QueryRData } from '@vunk/skzz'

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
  return request<QueryRData<Role>>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      menuId: 'role',
      modelId: 'role',
      dir: 'system',
      datasetIds: ['1', 'btn'],
      condition: {
        1: {
          ...query,
          ...(pagination ? { pagination } : {}),
        },
      },
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas
  })
}
