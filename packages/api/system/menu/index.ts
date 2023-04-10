import { request } from '@skzz-platform/shared/fetch/platform'
import { NormalObject } from '@vunk/core'
import { RestFetchExecOptions, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchQueryOptions, QueryRData } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { Menu } from './types'
const MENU_DATA = {
  'dir': 'system',
  'modelId': 'menu',
  'menuId': 'menu',
} as const

export const rMenus = (query: {
  client?: string,
  parentMenuId?: string,
  menuId?: string[],
}) => {
  return request<[QueryRData<Menu>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': [
        '1',
      ],
      'condition': {
        '1': {
          // parentMenuId: 0,
          ...query,
          menuId: query.menuId?.join(','),
        },
      },
      ...MENU_DATA,
      'buttonId': 'search',
    },
  } as RestFetchQueryOptions).then(res => {

    return res.datas[0].rows.map(item => {
      return {
        ...item,
        label: item.name,
        id: item.id + '',
      }
    })
  })

}

export const rMenusWithButtons = (
  query: {
    client?: string,
    ids?: string[],
    menuIds?: string[]
  },
) => {
  const condition = {
    ...query,
  } as NormalObject

  if (query.ids) {
    condition.ids = query.ids.join()
    condition.op = 'getMenuButtonsByIds'
  }
  
  if (query.menuIds) {
    condition.menuIds = query.menuIds.join()
    condition.op = 'getMenuButtonsByMenuIds'
  }
  
  return request<{
    '2.1': Menu[]
  }>({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      // 'datasetIds': ['2'],
      datasetId: '2',
      condition,
      ...MENU_DATA,
    },
  } as RestFetchExecOptions).then(res => {
    return res.datas['2.1']
  })
}

export const dMenus = (ids: string[]) => {
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
    msg: '删除菜单成功',
  })

}

export const cuMenu = (data: Partial<Menu>) => {
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
    msg: data.id ? '修改菜单成功' : '新增菜单成功',
  })
}

/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73882963
 */
export const cMenuButtons = (
  menuId: string,
  buttonIds: string[],
) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'buttonId': 'increase',
      'datas': [
        {
          'datasetId': '3.1',
          'rows': buttonIds.map(buttonId => {
            return  {
              'op': RestFetchOp.c,
              menuId,
              buttonId,
            }
          }),
          
        },
      ],
      ...MENU_DATA,
    },
  } as RestFetchSaveOptions)
}

/**
 * https://www.apifox.cn/link/project/2475837/apis/api-73882963
 */
export const dMenuButtons = (
  menuId: string,
  buttonIds: string[],
) => {
  return request({
    method: 'POST',
    url: '/core/busi/save',
    data: {
      'datas': [
        {
          'datasetId': '3.1',
          'rows': buttonIds.map(buttonId => {
            return  {
              'op': RestFetchOp.d,
              menuId,
              buttonId,
            }
          }),
          
        },
      ],
      ...MENU_DATA,
    },
  })
}



export * from './types'

