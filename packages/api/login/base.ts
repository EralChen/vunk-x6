import { restFetch } from '@skzz-platform/shared/fetch/platform'
import { setToken, removeToken, removeTenant, getApplication } from '@vunk/skzz/shared/utils-auth'
import { FirstParameter } from '@vunk/core'
import { useUserStore } from '@skzz-platform/stores/user'
// import { sleep } from '@vunk/core/shared/utils-promise'
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
    // removePlatform()
    window.location.reload()
  })

}

export const loginByPassword = (data: FirstParameter<typeof restFetch.login>) => {
  data.applicationId = getApplication()  || 'platform'
  return restFetch.login(data, {
    msg: restFetch.DEV ? '登录成功' : false,
    loading: true,
  }).then((res) => {    
    setToken(res.token)  
    // return sleep(2000)
  }).then(() => {
    // window.location.reload()
  })
}

export const rMenus = async (client?: string) => {
  return restFetch.rMenus(client).then(res => {
    
    return res.map(item => ({
      ...item,
      
      title: item.name,
      name: item.menuId,
    }))

  })
}

export const rTAInfo = () => {
  return restFetch.rDefaultTAInfo().then(res => {

    const userStore = useUserStore()
    const puppet = userStore.getPuppet()
    const theTenant = res.tenants.find(item => item.tenantId === puppet.tenantId)
    
    if (theTenant && theTenant.applications.find(item => item.applicationId === puppet.applicationId)) {
      res.defaultApplicationId = puppet.applicationId
      res.defaultTenantId = puppet.tenantId
    } else {
      userStore.setPuppet({
        tenantId: res.defaultTenantId,
        applicationId: res.defaultApplicationId,
      })
    }

    res.tenants = res.tenants.map(item => {
      return {
        ...item,
        value: item.tenantId,
        label: item.name,
        children: item.applications.map(app => {
          return {
            value: app.applicationId,
            label: app.name,
          }
        }),
      }
    })
    return res
  })
}