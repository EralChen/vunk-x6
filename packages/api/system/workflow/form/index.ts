import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { MENU_DATA } from '../const'
import { request } from '@skzz-template/shared/fetch/platform'

/**
 * 流程绑定表单
 * @param id 
 * @param formId 
 * @returns 
 */
export const bindForm2Flow = (id: string, formId: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datasetId': '1',
      'buttonId': 'modify',
      'datas': [
        {
          'datasetId': '1',
          'rows': [
            {
              'op': RestFetchOp.u,
              'id': id,
              'formId': formId,
            },
          ],
        },
      ],
      ...MENU_DATA,
    },
  }, {
    msg: '绑定表单成功!',
  })
}

// /**
//  * 节点绑定表单
//  * @param flow 
//  * @param flowId 
//  * @returns 
//  */
// export const bindForm2Node = (flow: string, flowId: string) => {
//   return request({
//     method: 'POST',
//     url: '/core/busi/exec',
//     data: {
//       'datasetId': '8',
//       'condition': {
//         'op': RestFetchOp.u,
//         'flowId': flowId,
//         'flow': flow,
//       },
//       'buttonId': 'import',
//       ...MENU_DATA,
//     },
//   }, {
//     msg: '绑定表单成功!',
//   })
// }