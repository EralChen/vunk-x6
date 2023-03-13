import { rUserInfo } from '@skzz-platform/api/login'
import { useUserStore as useVkUserStore } from '@vunk/skzz/stores'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const { 
    getUserInfo, setUserInfo,
    getPowerfulRoleId, getRoleIds, 
    setPuppet,
    getPuppet,
  } = useVkUserStore()


  const setUserInfoByToken = async () => {
    return rUserInfo().then(res => {
      const { tenantId } = getPuppet()
      setUserInfo(res, tenantId ? { tenantId } : {} )
      

      return res
    })
  }
  
  return { 
    getUserInfo, setUserInfo, getPowerfulRoleId, getRoleIds,
    setUserInfoByToken,
    setPuppet,
    getPuppet,  

  }
  
})
