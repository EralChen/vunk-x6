import { request } from '@skzz-template/shared/fetch/base'

export const rTestData = () => {
  return request<{
    name: string
  }>({
    url: '/test.json',
    method: 'GET',
  }).then(res => {
    return res.data
  })
}
