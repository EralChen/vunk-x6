import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PlatformInfo } from '@skzz-template/shared/types'
import { setPlatform, getPlatform } from '@skzz-template/shared/auth'
import { rDefaultPlatfrom, rPlatfromByCode } from '@skzz-template/api/platform'

export const usePlatformStore = defineStore('platform', () => {
  const platformInfo = ref({} as PlatformInfo)

  const setPlatformInfo = (res: PlatformInfo) => {
    platformInfo.value = res
    setPlatform(res.code)
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

  const getPlatformInfo = async () => {     
    if (!platformInfo.value.code) {
      await setPlatformInfoByCode(getPlatform() || '')
    }
    return platformInfo.value
  }

  return { 
    platformInfo, 
    setPlatformInfoByCode,
    getPlatformInfo,
    setPlatformInfo, 
  }
  
})
