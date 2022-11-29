import { PlatformInfo } from '@/types'

const platforms: PlatformInfo[] = [
  { code: 'scene', url: import.meta.env.VITE_PLATFORM_URL + '/scene-server'  }, 
]

export const rPlatfroms = async () => { 
  return [...platforms]
}

export const rPlatfromByCode = async (code: string) => {
  return platforms.find(item => item.code === code) as PlatformInfo
}

export const rDefaultPlatfrom = async () => { 
  return rPlatfroms().then(list => list[0])
}
