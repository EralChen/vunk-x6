import { rUserInfo } from '@/api/login'
import { useUserStore as useVkUserStore } from '@vunk/skzz/stores'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const { getUserInfo, setUserInfo, getPowerfulRoleId, getRoleIds } = useVkUserStore()

  const setUserInfoByToken = async () => {
    return rUserInfo().then(res => {
      setUserInfo(res)
    })
  }
  return { 
    getUserInfo, setUserInfo, getPowerfulRoleId, getRoleIds,
    setUserInfoByToken,

  }
  
})
