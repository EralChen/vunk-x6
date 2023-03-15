import { request } from '@skzz-platform/shared/fetch/platform'
import { MenuInfo } from '@vunk/skzz'
import { RestFetchQueryOptions, QueryRData } from '@vunk/skzz'

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
          parentMenuId: 0,
          ...query,
        },
      },
      'dir': 'system',
      'modelId': 'menu',
      'menuId': 'menu',
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


