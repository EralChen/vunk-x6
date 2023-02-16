import { request } from '@skzz-platform/shared/fetch/platform'
import { RestFetchQueryOptionsData } from '@vunk/skzz/shared/types'
export const rRoleList = () => {
  return request({
    method: 'POST',
    url: '/core/',
    data: {

    },
  })
}