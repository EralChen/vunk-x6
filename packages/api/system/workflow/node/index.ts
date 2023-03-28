import { MENU_DATA } from '../const'
import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchExecOptions, RestFetchQueryOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { WorkflowNode, WorkflowData } from '../types'
import { snowFlake } from '@skzz-platform/api/basic'


/**
 * https://www.apifox.cn/link/project/1903413/apis/api-71032252
 * @param query 
 * @returns 
 */
export const rWorkflowNode = (query: {
  flowId: string,
}) => {
  return request<{'8.1': WorkflowData}>({
    method: 'POST',
    url: '/core/busi/exec',
    DEV_NAME: 'rWorkflowNode',
    data: {
      'datasetId': '8',
      condition: {
        ...query,
        op: 1,
      },
      buttonId: 'search',
      ...MENU_DATA,
    },
  } as RestFetchExecOptions).then(res => {
    return res.datas['8.1']
  })
}

// export const rWorkflowNode = (query: {
//   flowId: string,
// }) => {
//   return request<[QueryRData<WorkflowNode>]>({
//     method: 'POST',
//     url: '/core/busi/query',
//     DEV_NAME: 'rWorkflowNode',
//     data: {
//       'datasetIds': [
//         '2',
//       ],
//       'condition': {
//         '2': {
//           ...query,
//         },
//       },
//       ...MENU_DATA,
//       'buttonId': 'search',
//     },
//   } as RestFetchQueryOptions).then(res => {
//     res.datas[0].rows.forEach(row => {
//       if (typeof  row.prevNodes === 'string') {
//         row.prevNodes = JSON.parse(row.prevNodes)
//       }
//       if (typeof  row.nextNodes === 'string') { 
//         row.nextNodes = JSON.parse(row.nextNodes)
//       }
     
//     })
//     return res.datas[0]
//   })
// }

export const dWorkflowNodes  = (ids: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '2',
          'rows': ids.map(id => ({
            id,
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

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-71028238
 * @param data 
 */
export const cWorkflowNodeByJson = async (flowId: string, flowJson: string) => {

  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '8',
      condition: {
        op: 4,
        flowId: flowId,
        flow: JSON.parse(flowJson
          .replaceAll(
            'zzg6-zzRect-0.331608056656901741679880010746',
            await snowFlake(),
          ).replaceAll('zzg6-zzRect-0.081158092120446221679880017945',
            await snowFlake(),
          ).replaceAll('edge-0.187535099745061331679880018820',
            await snowFlake(),
          ),
        ),
      },
      buttonId: 'import',
      ...MENU_DATA,
    },
  } as RestFetchExecOptions)
}


/**
 * https://www.apifox.cn/link/project/1903413/apis/api-71096680
 * @param nodeId 
 * @param operIds 
 */
export const bindOpersToNode = (nodeId: string, operIds: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '9',
      condition: {
        nodeId,
        opers: operIds,
      },
      ...MENU_DATA,
    },

  } as RestFetchExecOptions, {
    msg: '绑定角色成功',
  })
}
