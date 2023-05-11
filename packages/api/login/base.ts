import { restFetch } from '@skzz-platform/shared/fetch/platform'
import { setToken, removeToken } from '@vunk/skzz/shared/utils-auth'
import { FirstParameter } from '@vunk/core'
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
    // removeTenant()
    removeToken()
    // removePlatform()
    window.location.reload()
  })

}

export const loginByPassword = (data: FirstParameter<typeof restFetch.login>) => {
  data.applicationId = 'platform'
  data.tenantId = 'default'
  return restFetch.login(data, {
    msg: restFetch.DEV ? '登录成功' : false,
    loading: true,
  }, {
    setApplication: false,
    setTenant: false,
  }).then((res) => {    
    setToken(res.token)                                                            
    // return sleep(2000)
  }).then(() => {
    // window.location.reload()
  })
}

export const rMenus = async (client?: string) => {
  return restFetch.rMenus(client)
    .catch(() => { // 兼容旧版本
      return restFetch.rMenus(client, {
        data: {
          'datasetId': '1',
          'buttonId': 'init',
          'condition': {
            'op': 'initMenu',
            client,
          },
          'dir': 'system',
          'modelId': 'init',
          'menuId': 'init',
        },
      })
    })
    .then(res => {
      const doc = res.map(item => ({
        ...item,
      
        title: item.name,
        name: item.menuId,
      }))
      // 添加 404 数据
      doc.push({ path: '/:pathMatch(.*)*', display: 0 } as typeof doc[0])
      return doc

    })
}

export const rTAInfo = () => {
  return restFetch.rDefaultTAInfo().then(res => {
    if (res?.tenants) {
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
    }
    return res
  })
}
