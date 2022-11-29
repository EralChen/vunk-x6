import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PlatformInfo } from '@/types'
import { setPlatform } from '@/utils'

export const usePlatformStore = defineStore('platform', () => {
  const platformInfo = ref({} as PlatformInfo)

  const setPlatformInfo = (res: PlatformInfo) => {
    platformInfo.value = res
    setPlatform(res.code)
  }

  const getPaltformInfo = () => { 
    return platformInfo.value
  }

  return { 
    platformInfo, 
    getPaltformInfo,
    setPlatformInfo, 
  }
  
})
