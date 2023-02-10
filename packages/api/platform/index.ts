import { PlatformInfo } from '@skzz-platform/shared/types'
import { usePlatformStore } from '@skzz-platform/stores/platform'
import { request } from '@skzz-platform/shared/fetch/public'

export const rPlatfroms = async () => { 
  return request<PlatformInfo[]>({
    method: 'GET',
    url: '/platforms.json',
    cache: {
      id: 'platforms',
    },
  }).then(res => {
    return res
  })
}

export const rPlatfromByCode = async (code: string) => {
  return rPlatfroms().then(res => {
    return res.find(item => item.code === code) 
  }).then(res => {
    if (res) {
      const platformStore = usePlatformStore()
      platformStore.setPlatformInfo(res)
    }
    return res
  })
}

export const rDefaultPlatfrom = async () => { 
  return rPlatfroms().then(list => list[0])
}
