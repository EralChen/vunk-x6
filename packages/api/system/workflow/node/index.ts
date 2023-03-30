import { MENU_DATA } from '../const'
import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchExecOptions, RestFetchQueryOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { WorkflowNode, WorkflowData, WorkflowNodeRaw } from '../types'
import { snowFlake } from '@skzz-platform/api/basic'
import { rWorkflow } from '@skzz-platform/api/system/workflow'
import { GraphData, TreeGraphData } from '@antv/g6'

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-71032252
 * @param query 
 * @returns 
 */
export const rWorkflowNodes = (query: {
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

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-69112632
 * @param query 
 */
export const rWorkflowNodeRaw = (query: {
  itemId: string,
}) => {
  return request<{
    '5.1': WorkflowNodeRaw[]
  }>({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': '5',
      'condition': {
        'flow': {
          ...query,
          'op': 'totalFlow',
        },
      },
      ...MENU_DATA,
    },
  } as RestFetchExecOptions).then(res => {
    return res.datas['5.1']
  })
}


export const rWorkflowNodesWithRaw = (query: {
  flowId?: string,
  id?: string,
  itemId?: string,
}) => {
  return rWorkflow(query).then(res => {
    return Promise.all(
      [
        rWorkflowNodes({ flowId: res.flowId }), 
        rWorkflowNodeRaw({ itemId: res.itemId }),
        res,
      ],
    ).then(res => {
      const [data, raws, info] = res
      return {
        data,
        raws,
        info,
      }
    })
  })
}





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
export const cWorkflowNodeByJson = async (flowId: string, flowData: GraphData | TreeGraphData, ieEdit = false) => {

  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '8',
      condition: {
        op: ieEdit ? 8 : 4,
        flowId: flowId,
        flow: flowData,
      },
      buttonId: 'import',
      ...MENU_DATA,
    },
  } as RestFetchExecOptions, {
    msg: '保存成功！',
  })
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
