import { restFetch } from '@skzz-platform/shared/fetch/platform'
import { setToken, removeToken, removeTenant, getApplication } from '@vunk/skzz/shared/utils-auth'
import { FirstParameter } from '@vunk/core'

export const rCaptcha = () => {
  return restFetch.captcha().then(res => {
    return res.datas
  })
}

export const rUserInfo = () => {
  return restFetch.rUserInfo()
}

export const logout = () => {

  return restFetch.logout().finally(() => {
    removeTenant()
    removeToken()
    window.location.reload()
  })

}

export const loginByPassword = (data: FirstParameter<typeof restFetch.login>) => {
  data.applicationId = getApplication()  
  return restFetch.login(data, {
    msg: restFetch.DEV ? '登录成功' : false,
    loading: true,
  }).then((res) => {    
    setToken(res.token)  
    window.location.reload()
    
  })
}

export const rMenus = async (client?: string) => {
  return restFetch.rMenus(client).then(res => {
    return res
  })
}
