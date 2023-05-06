import { MENU_DATA } from '../const'
import { request } from '@skzz-template/shared/fetch/platform'
import { FlowCallback } from './types'

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-78597752
 * @param id 
 * @param flowCallBack 
 * @returns 
 */
export const cFlowCallback = (id: string, flowCallBack: FlowCallback) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': 5,
      'condition': {
        'flow': {
          'op': 'flowCallBack',
          'id': id,
          'flowCallBack': flowCallBack,
        },
      },
      ...MENU_DATA,
    },
  })
}

/**
 * https://www.apifox.cn/link/project/1903413/apis/api-78598351
 * @param id 
 * @returns 
 */
export const rFlowCallbacks = (id: string) => {
  return request<{
    '5.1': string
  }>({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': 5,
      'condition': {
        'flow': {
          'id': id,
          'op': 'flowCallBackInfo',
        },
      },
      ...MENU_DATA,
    },
  }).then(res => res.datas['5.1'])
}