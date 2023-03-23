import { MENU_DATA } from '../const'
import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchExecOptions, RestFetchQueryOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { WorkflowNode } from '../types'
import { snowFlake } from '@skzz-platform/api/basic'


export const rWorkflowNode = (query: {
  flowId: string,
}) => {
  return request<[QueryRData<WorkflowNode>]>({
    method: 'POST',
    url: '/core/busi/query',
    DEV_NAME: 'rWorkflowNode',
    data: {
      'datasetIds': [
        '2',
      ],
      'condition': {
        '2': {
          ...query,
        },
      },
      ...MENU_DATA,
      'buttonId': 'search',
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0]
  })
}

export const cuWorkflowNode = async (data: Partial<WorkflowNode>) => {
  const op = data.id ? RestFetchOp.u : RestFetchOp.c
  if (op === RestFetchOp.c) {
    data.id = await (snowFlake())
  }
  
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '2',
          'rows': [
            {
              op,
              ...data,
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