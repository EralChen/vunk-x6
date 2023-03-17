

import { request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'

const MENU_DATA = {
  'dir': 'system',
  'modelId': 'model',
  'menuId': 'model',
} as const

export const rDataModels = (query) => {
  return request<[QueryRData]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [
        '1',
      ],
      'condition': {
        '1': {
          ...query,
        },
      },
      ...MENU_DATA,
      'buttonId': 'search',
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0].rows
  })
}

export const dDataModels = (ids: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [
        {
          datasetId: '1',
          rows: ids.map(id => {
            return {
              id,
              op: RestFetchOp.d,
            }
          },
          ),
        },
      ],
      ...MENU_DATA,
      'buttonId': 'save',
    },
  }, {
    msg: '删除成功',
  })
}

export const cuDataModel = (data) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [
        {
          datasetId: '1',
          rows: [
            {
              ...data,
              op: data.id ? RestFetchOp.u : RestFetchOp.c,
            },
          ],
        },
      ],
      ...MENU_DATA,
      'buttonId': 'save',
    },
  }, {
    msg: data.id ? '修改成功' : '新增成功',
  })
}
