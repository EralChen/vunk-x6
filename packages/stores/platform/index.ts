import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PlatformInfo } from '@skzz-platform/shared/types'
import { setPlatform } from '@skzz-platform/shared/auth'
import { rDefaultPlatfrom, rPlatfromByCode } from '@skzz-platform/api/platform'

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
      await rDefaultPlatfrom().then(res => {
        setPlatformInfo(res)
      })
    } else {

      await rPlatfromByCode(code).then(res => {
        if (res) {
          setPlatformInfo(res)
        } else {
          // eslint-disable-next-line no-console
          console.warn('平台不存在')
        }
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
