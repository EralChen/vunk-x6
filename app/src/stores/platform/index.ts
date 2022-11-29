import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PlatformInfo } from '@/types'
import { setPlatform } from '@/utils'
import { rPlatfromByCode } from '@/api/platform'

export const usePlatformStore = defineStore('platform', () => {
  const platformInfo = ref({} as PlatformInfo)

  const setPlatformInfo = (res: PlatformInfo) => {
    platformInfo.value = res
    setPlatform(res.code)
  }

  const getPaltformInfo = () => { 
    return platformInfo.value
  }

  const setPlatformInfoByCode = async (code: string) => { 
    return rPlatfromByCode(code).then(res => {
      setPlatformInfo(res)
    })
  }

  return { 
    platformInfo, 
    setPlatformInfoByCode,
    getPaltformInfo,
    setPlatformInfo, 
  }
  
})
