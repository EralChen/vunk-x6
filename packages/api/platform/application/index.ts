import { Pagination } from '@skzz-platform/shared'
import { request } from '@skzz-platform/shared/fetch/platform'
import { RestFetchQueryOptions, QueryRData, RestFetchSaveOptions, RestFetchExecOptions } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { MENU_DATA } from './const'
import { Application as Row, BoundApplication } from './types'
import { rBtns } from '@skzz-platform/api/basic'
export const rApplications = (
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

export const rApplicationBtns = () => {
  return rBtns(MENU_DATA)
}


export const dApplications = (ids: string[]) => {
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
    msg: '删除角色成功',
  })
}

const cApplication = (data: Partial<Row>) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '5',
      condition: {
        op: 'increase',
      },

      datas: [
        {
          datasetId: '1',
          rows: [
            {
              ...data,
              op: RestFetchOp.c,
            },
          ],
        },
      ],

      'buttonId': 'increase',
      ...MENU_DATA,
    },
  } as RestFetchExecOptions, {
    msg: '新增成功',
  })
}

const uApplication = (data: Partial<Row>) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '5',
      condition: {
        op: 'modify',
      },

      datas: [
        {
          datasetId: '1',
          rows: [
            {
              ...data,
              op: RestFetchOp.u,
            },
          ],
        },
      ],

      'buttonId': 'modify',
      ...MENU_DATA,
    },
  } as RestFetchExecOptions, {
    msg: '修改成功',
  })
}


export const cuApplication = (data: Partial<Row>) => {
  const op = data.id ? RestFetchOp.u : RestFetchOp.c

  if (op === RestFetchOp.c) {
    return cApplication(data)
  } else {
    return uApplication(data)
  }
}


export const rBoundApplications = (applicationId: string) => {
  return request<[QueryRData<BoundApplication>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [
        '2.2',
      ],
      'condition': {
        '2.2': {
          'applicationId': applicationId,
        },
      },
      'dir': 'platform',
      'modelId': 'application',
      'menuId': 'application',
      'buttonId': 'search',
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0]
  })
}

export const cBoundApplications = (
  data: Partial<BoundApplication>[],
  // d = true,
) => {
  const rows = data.map(item => {
    return {
      ...item,
      op: RestFetchOp.c,
    }
  })
  // if (d) {
  //   rows.unshift({
  //     applicationId: data[0].applicationId,
  //     op: RestFetchOp.d,
  //   })
  // }

  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      ...MENU_DATA,
      'buttonId': 'increase',
      'condition': {
        'op': 'increase',
      },

      'datas': [{
        'datasetId': '2.2',
        rows,
      }],
      'datasetId': '6',
        
    },
  }, {
    loading: true,
  })
}

export const dBoundApplications = (data: Partial<BoundApplication>[]) => {
  const rows = data.map(item => {
    return {
      ...item,
      op: RestFetchOp.d,
    }
  })
  
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      ...MENU_DATA,
      'buttonId': 'remove',
      'condition': {
        'op': 'remove',
      },

      'datas': [{
        'datasetId': '2.2',
        rows,
      }],
      'datasetId': '6',
        
    },
  }, {
    loading: true,
  })
}



export * from './types'
