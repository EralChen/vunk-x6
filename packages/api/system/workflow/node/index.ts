import { MENU_DATA } from '../const'
import { request } from '@skzz-platform/shared/fetch/platform'
import { RestFetchExecOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { WorkflowNode, WorkflowData, WorkFlowNodeState } from '../types'
import { snowFlake } from '@skzz-platform/api/basic'
import { rWorkflow } from '@skzz-platform/api/system/workflow'
import { GraphData, TreeGraphData } from '@antv/g6'
import { TotalFlow } from './types'

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-71032252  
 * 查询节点定义
 * @param query 
 * @returns 
 */
export const rWorkflowNodes = (query: {
  flowId: string,
}) => {
  return request<{ '8.1': WorkflowData }>({
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
 * 查询节点实例
 * @param query 
 */
export const rWorkflowNodeRaw = (query: {
  itemId: string,
  flowInstId?: string
}) => {
  return request<{
    '5.1': TotalFlow
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

/**
 * 先调用rWorkflow，再调用rWorkflowNodeRaw
 * @param query 
 * @returns 
 */
export const rWorkflowNodesWithRaw = (query: {
  flowId?: string,
  id?: string,
  itemId?: string,
}) => {
  return rWorkflow(query).then(res => {
    return Promise.all(
      [
        rWorkflowNodeRaw({ itemId: res.itemId }),
        res,
      ],
    ).then(res => {
      const [raws, info] = res
      return {
        raws,
        info,
      }
    })
  })
}


export const dWorkflowNodes = (ids: string[]) => {
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
 * 绑定操作人
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
    msg: '绑定成功',
  })
}



/**
 * 节点实例添加协办人
 * https://www.apifox.cn/link/project/1903413/apis/api-72917748
 * @param nodeInstId 
 * @param assistOperIds 
 */
export const bindAssistOperToNode = (nodeInstId: string, assistOperIds: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '5',
      condition: {
        flow: {
          op: 'assistOper',
          nodeInstId,
          assistOperIds,
        },
      },
      ...MENU_DATA,
    },

  } as RestFetchExecOptions, {
    msg: '绑定成功',
  })
}

/**
 * 审批节点
 * https://www.apifox.cn/link/project/1903413/apis/api-69116505
 * @param data
 * @returns 
 */
export const doApproveNode = (data: {
  itemId: string,
  status: WorkFlowNodeState,
  memo?: string,
  nodeInstId?: string,
  backNodeId?: string
}) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': '5',
      'condition': {
        'flow': {
          'op': 'audit',
          ...(data ? data : {}),
        },
      },
      ...MENU_DATA,
      'buttonId': 'modify',
    },

  } as RestFetchExecOptions, {
    msg: '操作成功',
  })
}

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-77292352
 * @param data 审批需要的数据
 * @param formData 节点表单数据
 * @param id 节点实例id？
 * @returns 
 */
export const doApproveNodeWithForm = (data: {
  itemId: string,
  status: WorkFlowNodeState,
  memo?: string,
  nodeInstId?: string,
  backNodeId?: string
}, formData: any, id: string, formTable: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': '2',
      'condition': {
        'flow': {
          'op': 'audit',
          ...(data ? data : {}),
        },
      },
      'datas': formData ?  [
        {
          'datasetId': '1',
          'rows': [
            {
              ...(formData ? formData : {}),
              'op': RestFetchOp.u,
              'id': id,
            },
          ],
        },
      ] : undefined,
      'dir': formTable,
      'modelId': formTable,
      'menuId': formTable,
      'buttonId': 'modify',
    },

  } as RestFetchExecOptions, {
    msg: '操作成功',
  })
}