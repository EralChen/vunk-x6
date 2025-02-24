import type { RestFetchExecOptions } from '@vunk/skzz'
import type { LoginQuery } from './types'
import { request, restFetch } from '@skzz/platform/shared/fetch/platform'
import { getTenant, setTenant } from '@vunk/skzz/shared/utils-auth'
import { setDefaultHeader } from '@vunk/skzz/shared/utils-fetch'

restFetch.baseURL = import.meta.env.VITE_DEFAULT_PLATFORM_API

export * from './use'

export function rLoginTenants () {
  return request<{
    1.1: {
      tenantId: string
      name: string
    }[]
  }>({
    url: '/core/busi/exec',
    method: 'POST',
    data: {
      datasetId: '1',
      dir: 'system',
      modelId: 'tenant',
      menuId: 'tenant',
      condition: {
        op: 'getTenantList',
      },
    },
    setRequestInit (config) {
      setDefaultHeader(config)
      return config
    },
  } as RestFetchExecOptions).then((res) => {
    return res.datas['1.1']
  })
}

export function login (query: LoginQuery) {
  return restFetch.login({
    ...query,
  }, {}, {
    setTenant: false,
  }).then(() => {
    setTenant(query.loginTenantId)
  })
}
