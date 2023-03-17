

import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { NormalObject } from '@vunk/core'
import { QueryRData, RestFetchExecOptions, RestFetchQueryOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'

const MENU_DATA = {
  'dir': 'system',
  'modelId': 'model',
  'menuId': 'model',
} as const

export const rDataModels = (
  query: NormalObject = {}, 
  pagination?: Pagination,
) => {
  return request<{
    '1.2': QueryRData<{
      path: string;
      modelId: string;
      // id: string;
    }>
  }>({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '1',
      condition: {
        ...(pagination ? { pagination } : {}),
        ...query,
        op: 'query',
      },
      ...MENU_DATA,
    },
  
  } as RestFetchExecOptions).then(res => {
    return res.datas['1.2']
  })
}

export const dDataModels = (modelIds: string[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      datas: [
        {
          datasetId: '1',
          rows: modelIds.map(modelId => {
            return {
              modelId,
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
