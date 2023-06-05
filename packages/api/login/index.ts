import { withPlatform, request } from '@skzz-platform/shared/fetch/platform'
import { RestFetchExecOptions } from '@vunk/skzz'
import * as baseLogin from './base'


export const rCaptcha = withPlatform(baseLogin.rCaptcha)
export const rUserInfo = withPlatform(baseLogin.rUserInfo)
export const logout = withPlatform(baseLogin.logout)
export const loginByPassword = withPlatform(baseLogin.loginByPassword)
export const rMenus = withPlatform(baseLogin.rMenus)
export const rTAInfo  = withPlatform(baseLogin.rTAInfo)


export const uUserPassword = (data: {
  'uid': string,
  'password': string,
  'newPassword': string,
}) => {
  return request({
    url: '/core/busi/exec',
    method: 'POST',
    setRequestInit: (config: RequestInit) => {
      const headers = config.headers as Headers
      headers.set('application', 'platform')
      headers.set('tenant', 'default')
      return config
    },
    data: {
      'dir': 'system',
      'menuId': 'sso',
      'modelId': 'sso',
      'buttonId': 'login',
      'datasetId': '1',
      'condition': {
        ...data,
        'op': 'changePass',
      },
    },
  } as RestFetchExecOptions, {
    msg: '修改成功',  
  })
}