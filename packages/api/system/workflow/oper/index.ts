import { MENU_DATA } from '../const'
import { request } from '@skzz-template/shared/fetch/platform'
import { QueryRData, RestFetchExecOptions, RestFetchQueryOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { WorkflowOper } from '../types'
import { snowFlake } from '@skzz-template/api/basic'
import { Pagination } from '@skzz-template/shared'


export const rWorkflowOpers = (query: Partial<WorkflowOper>, pagination: Pagination) => {
  return request<[QueryRData<WorkflowOper>]>({
    method: 'POST',
    url: '/core/busi/query',
    DEV_NAME: 'rWorkflowOpers',
    data: {
      datasetIds: ['3'],
      condition: {
        3: {
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


export const dWorkflowOpers  = (operIds: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '3',
          'rows': operIds.map(operId => ({
            operId,
            op: RestFetchOp.d,
          })),
        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions, {
    msg: '删除成功',
  })
}


export const cuWorkflowOper = async (data: Partial<WorkflowOper>) => {
  const op = data.operId ? RestFetchOp.u : RestFetchOp.c
  if (op === RestFetchOp.c) {
    data.operId = await (snowFlake())
  }
  
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '3',
          'rows': [
            {
              ...data,
              op,
            },
          ],
        },
      ],
      ...MENU_DATA,
    },
      
  } as RestFetchSaveOptions, {
    msg: op === RestFetchOp.c ? '新增成功' : '修改成功',
  })
}