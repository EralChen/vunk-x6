import { rTAInfo, rUserInfo } from '@skzz-platform/api/login'
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
      const theTenant = res.tenants.find(item => item.tenantId === localPuppet.tenantId)
      
      if (theTenant && theTenant.applications.find(item => item.applicationId === localPuppet.applicationId)) {
        res.defaultApplicationId = localPuppet.applicationId
        res.defaultTenantId = localPuppet.tenantId
      } 
  
      _setPuppet({
        tenantId: res.defaultTenantId,
        applicationId: res.defaultApplicationId,
      })
    }

  }
  
  return { 
    getUserInfo, setUserInfo, getPowerfulRoleId, getRoleIds,
    setUserInfoByToken,
    setPuppet,
    getPuppet,  

  }
  
})
