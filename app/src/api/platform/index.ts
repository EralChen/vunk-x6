import { PlatformInfo } from '@/types'
import { usePlatformStore } from '@/stores/platform'
const platforms: PlatformInfo[] = [
  { code: 'scene', url: import.meta.env.VITE_PLATFORM_URL + '/scene-server'  }, 
]

export const rPlatfroms = async () => { 
  return [...platforms]
}

export const rPlatfromByCode = async (code: string) => {
  return Promise.resolve(
    platforms.find(item => item.code === code) as PlatformInfo,
  ).then(res => {
    const platformStore = usePlatformStore()
    platformStore.setPlatformInfo(res)
    return res
  })
}

export const rDefaultPlatfrom = async () => { 
  return rPlatfroms().then(list => list[0])
}
