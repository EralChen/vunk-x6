import { MENU_DATA } from '../const'
import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { QueryRData } from '@vunk/skzz'
import { FlowNodeInstance } from '../types'

export const rInstanceList = (pagination: Pagination, flowId: string) => {
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
 * 
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
