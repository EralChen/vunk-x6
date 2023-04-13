import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { RestFetchQueryOptions, QueryRData, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { rBtns } from '@skzz-platform/api/basic'
import { MENU_DATA } from './const'
import { Button as Row } from './types'

export const rButtons = (
  query: Partial<Row> = {}, 
  pagination?: Pagination,
) => {
  return request<[
    QueryRData<Row>
  ]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      datasetIds: ['1'],
      condition: {
        1: {
          ...query,
          ...(pagination ? { pagination } : {}),
        },
      },
      ...MENU_DATA,
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0]
  })
}

export const rButtonBtns = () => {
  return rBtns(MENU_DATA)
}

export const dButtons = (ids: string[]) => {
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
          }),


        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions, {
    msg: '删除成功',
  })
}

export const cuButton = (data: Partial<Row>) => {
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
    },
  } as RestFetchSaveOptions, {
    msg: data.id ? '修改成功' : '新增成功',
  })
}

export * from './types'
