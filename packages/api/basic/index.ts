import { restFetch, withPlatform, request } from '@skzz-platform/shared/fetch/platform'
import { QueryRData, RestFetchQueryOptions } from '@vunk/skzz'
import { Button } from '@skzz-platform/api/system/button'
import { FirstParameter } from '@vunk/core'

export const snowFlake = withPlatform((...args) => restFetch.snowFlake(...args))

export const upload = withPlatform(
  (
    data: FirstParameter<typeof restFetch.upload>, 
    init?: RequestInit,
  ) => {
    return restFetch.upload(data, {
      msg: '上传成功',
      err: false,
    }, init)
  },
)

export const rFile = (query: {
  fileId: string
}) => {
  return request<{
    'fileName': string,
    'size': number,
    memo: string,
    realName: string,
    fileId: string,
    'id': string
  }>({
    url: '/file/getFileInfo',
    method: 'GET',
    params: query,
    setRequestInit: (config) => {
      const headers = config.headers as Headers
      headers.set('application', 'platform')
      headers.set('tenant', 'default')
      return config
    },
  }).then(res => {
    const data = res.datas

    return {
      ...data,
      id: data.fileId,
      name: data.realName,
      url: restFetch.baseURL + `/file/download?fileId=${data.fileId}`,
      response: data,
    }
  })
}


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
    cache: {
      id: ['btn', menuData.dir, menuData.modelId, menuData.menuId].join(),
    },
  } as RestFetchQueryOptions).then(res => {
    return res.datas[0].rows
  })
}
