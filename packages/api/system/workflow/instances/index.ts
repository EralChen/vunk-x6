import { MENU_DATA } from '../const'
import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { QueryRData } from '@vunk/skzz'
import { FlowNodeInstance } from '../types'
/**
 * https://www.apifox.cn/link/project/1903413/apis/api-77333403
 * @param pagination 
 * @param flowId 
 * @returns 
 */
export const rInstanceList = (pagination?: Pagination, flowId?: string, id?: string) => {
  return request<[QueryRData<FlowNodeInstance>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [
        '10',
      ],
      'condition': {
        '10': {
          'flowId': flowId,
          id,
          ...(pagination ? { pagination } : {}),
        },
      },
      ...MENU_DATA,
      'buttonId': 'search',
    },
  }).then(res => {
    return res.datas[0]
  })
}


export type InstanceBindOpers = {
  nodeId: string,
  opers: { operId: string, operName: string }[]
}
/**
 * https://www.apifox.cn/link/project/1903413/apis/api-77292033
 * @param data 
 * @returns 
 */
export const genInstance = (
  data: {
    itemId: string,
    skipNodes: string[],
    nodeOpers: InstanceBindOpers[],
    formData: any,
    formTable: string
  }) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'buttonId': 'increase',
      'datasetId': '2',
      'condition': {
        'flow': {
          'op': 'startAndSubmit',
          'itemId': data.itemId,
          'skipNodes': data.skipNodes,
          'nodeOpers': data.nodeOpers,
        },
      },
      'datas': [
        {
          'datasetId': '1',
          'rows': [
            {
              ...data.formData,
              'op': 4,
            },
          ],
        },
      ],
      'dir': data.formTable,
      'modelId': data.formTable,
      'menuId': data.formTable,
    },
  }, {
    msg: '启动成功!',
  })
}


/**
 * https://www.apifox.cn/link/project/1903413/apis/api-77333648
 * 查询表单配置
 * @param flowInstId 节点的实例id
 * @returns 
 */
export const rFormConfigInfo = (flowInstId: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': '5',
      'condition': {
        'flow': {
          'flowInstId': flowInstId,
          'op': 'formInfo',
        },
      },
      ...MENU_DATA,
    },
  })
}

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-77645506
 * @param nodeInstId 节点的实例id
 * @returns 
 */
export const rFormInfo = (nodeInstId: string) => {
  return request<{
    '5.1': Record<string, any>
  }>({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': '5',
      'condition': {
        'flow': {
          'nodeInstId': nodeInstId,
          'op': 'formData',
        },
      },
      ...MENU_DATA,
    },
  }).then(res => res.datas[5.1])
}