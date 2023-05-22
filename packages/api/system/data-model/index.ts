

import { Pagination } from '@skzz-platform/shared'
import { ButtonId } from '@skzz-platform/shared/enum'
import { request } from '@skzz-platform/shared/fetch/platform'
import { Merge, NormalObject } from '@vunk/core'
import { QueryRData, RestFetchExecOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { DataModel } from './types'

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
    '1.1': QueryRData<DataModel>
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
      buttonId: ButtonId.search,
      ...MENU_DATA,
    },
  
  } as RestFetchExecOptions).then(res => {
    return res.datas['1.1']
  })
}

export const dDataModels = (rows: DataModel[]) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      ...MENU_DATA,
      'buttonId': 'remove',
      'datasetId': '1',
      'condition': {
        'op': 'remove',
        rows,
      },
    },
  } as RestFetchExecOptions, {
    msg: '删除成功',
  })
}

export const cuDataModel = (data: Partial<DataModel>) => {
  const isU = !!data.id
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      ...MENU_DATA,

      'buttonId': isU ? ButtonId.modify : ButtonId.increase,
      'datasetId': '1',
      'condition': {
        'op': 'save',

        ...data,
        keys: (data.keys as string[]).join(','),
      },
    },
  } as RestFetchExecOptions, {
    msg: data.id ? '修改成功' : '新增成功',
  })
}


export * from './types'
