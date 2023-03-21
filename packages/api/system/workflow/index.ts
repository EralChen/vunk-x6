import { Pagination } from '@skzz-platform/shared'
import { request, restFetch } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { Workflow } from './types'

const MENU_DATA = {
  'dir': 'system',
  'modelId': 'flow',
  'menuId': 'capitalFlow',
} as const

export const rWorkflows = (query, pagination?: Pagination) => {
  return request<[QueryRData<Workflow>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [
        '1',
      ],
      'condition': {
        '1': {
          ...query,
          ...(pagination ? { pagination } : {}),
        },
      },
      ...MENU_DATA,
      'buttonId': 'search',
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0]
  })
}

export const rWorkflow = (id: string) => {
  return rWorkflows({ id }).then(res => {
    return res.rows[0]
  })
}

export const dWorkflows = (ids: string[]) => {
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
  })
}

export const cuWorkflow = async (data: Partial<Workflow>) => {
  if (!data.flowId) {
    data.flowId = await restFetch.snowFlake()
  }
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '1',
          'rows': [
            {
              ...data,
              'op': data.id ? RestFetchOp.u : RestFetchOp.c,
            },
          ],
        },
      ],
      ...MENU_DATA,
      'buttonId': 'save',
    },
  }, {
    msg: data.id ? '修改流程成功' : '新增流程成功',
  })
}

