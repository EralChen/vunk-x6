import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchExecOptions, RestFetchQueryOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { Workflow } from './types'
import { snowFlake } from '@skzz-platform/api/basic'
import { MENU_DATA } from './const'

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
    const doc = res.rows[0]
    doc.nodes = JSON.parse(doc.nodes as unknown as string)
    return doc
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
    data.flowId = await snowFlake()
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

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-69105530
 * @param itemId 绑定的业务id
 */
export const runWorkflow = (itemId: string) => {
  return request({
    method: 'POST',
    DEV_NAME: 'runWorkflow',
    url: '/core/busi/exec',
    data: {
      datasetId: '5',
      condition: {
        flow: {
          itemId,
          op: 'startAndSubmit',
        },
      },
      ...MENU_DATA,
    },

  } as RestFetchExecOptions, {
    msg: '流程启动成功',
  })

}
export * from './node'
export * from './types'
