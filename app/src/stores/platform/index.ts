import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PlatformInfo } from '@/types'
import { setPlatform } from '@/utils'
import { rDefaultPlatfrom, rPlatfromByCode } from '@/api/platform'

export const usePlatformStore = defineStore('platform', () => {
  const platformInfo = ref({} as PlatformInfo)

  const setPlatformInfo = (res: PlatformInfo) => {
    platformInfo.value = res
    setPlatform(res.code)
  }

  const getPlatformInfo =  () => {     
    return platformInfo.value
  }

  const setPlatformInfoByCode = async (code?: string) => { 
    if (!code) {
      rDefaultPlatfrom().then(res => {
        setPlatformInfo(res)
      })
    } else {
      rPlatfromByCode(code).then(res => {
        setPlatformInfo(res)
      })
    }

  }

  return { 
    platformInfo, 
    setPlatformInfoByCode,
    getPlatformInfo,
    setPlatformInfo, 
  }
  
})
