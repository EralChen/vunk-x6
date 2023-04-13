import { restFetch, withPlatform, request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions } from '@vunk/skzz'
import { Button } from '@skzz-platform/api/system/button'

export const snowFlake = withPlatform((...args) => restFetch.snowFlake(...args))


export const rBtns = (menuData: {
   dir: string
   modelId: string
   menuId: string
}) => {
  return request<[QueryRData<Button>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      datasetIds: ['btn'],
      ...menuData,
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0].rows
  })
}
