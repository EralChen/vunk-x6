import type { Pagination } from '@skzz/platform'
import type { QueryRData, RestFetchQueryOptions } from '@vunk/skzz'
import type { Workflow } from './types'
import { request } from '@skzz/platform/shared/fetch/platform'
import { MENU_DATA } from './const'

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-69170149
 * @param query
 * @param pagination
 */
export function rWorkflows (query: Partial<Workflow>, pagination?: Pagination) {
  return request<[QueryRData<Workflow>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      datasetIds: [
        '1',
      ],
      condition: {
        1: {
          ...query,
          ...(pagination ? { pagination } : {}),
        },
      },
      ...MENU_DATA,
      buttonId: 'search',
    },
  } as RestFetchQueryOptions).then((res) => {
    return res.datas[0]
  })
}
