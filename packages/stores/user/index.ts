import { rTAInfo, rUserInfo } from '@skzz-template/api/login'
import { UserPuppet } from '@vunk/skzz'
import { useUserStore as useVkUserStore } from '@vunk/skzz/stores'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const { 
    getUserInfo, setUserInfo,
    getPowerfulRoleId, getRoleIds, 
    setPuppet: _setPuppet,
    getPuppet,
  } = useVkUserStore()


  const setUserInfoByToken = async () => {
    return rUserInfo().then(res => {
      const { tenantId } = getPuppet()
      setUserInfo(res, tenantId ? { tenantId } : {} )
      

      return res
    })
  }

  const setPuppet = async (inputPt?: UserPuppet) => {

    if (inputPt) {
      _setPuppet(inputPt)
    } else {
      const localPuppet = getPuppet()
      const res = await rTAInfo()
      if (res) { // 本地有权限的租户和应用 是否在返回的租户和应用中。如果不在设置为默认租户和应用
        const theTenant = res.tenants.find(item => item.tenantId === localPuppet.tenantId)
      
        if (theTenant && theTenant.applications.find(item => item.applicationId === localPuppet.applicationId)) {
          res.defaultApplicationId = localPuppet.applicationId
          res.defaultTenantId = localPuppet.tenantId
        } 
    
        _setPuppet({
          tenantId: res.defaultTenantId,
          applicationId: res.defaultApplicationId,
        })
      } else {
        _setPuppet({
          tenantId: 'default',
          applicationId: 'platform',
        })
      }

    }

  }
  
  return { 
    getUserInfo, setUserInfo, getPowerfulRoleId, getRoleIds,
    setUserInfoByToken,
    setPuppet,
    getPuppet,  

  }
  
})
