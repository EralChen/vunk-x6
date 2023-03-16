import { request } from '@skzz-platform/shared/fetch/platform'
import { MenuInfo, RestFetchSaveOptions } from '@vunk/skzz'
import { RestFetchQueryOptions, QueryRData } from '@vunk/skzz'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
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
  return request<[QueryRData<MenuInfo>]>({
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
        id: item.menuId,
        pId: item.parentMenuId,
      }
    })
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
          rows: ids.map(menuId => {
            return {
              menuId,
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

export const cuMenu = (data: Partial<MenuInfo>) => {
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

