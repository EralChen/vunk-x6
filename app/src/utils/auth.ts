import Cookie from 'js-cookie'

const PLATFORM_KEY = 'VUNK_SKZZ_REST_PLATFORM'

export function getPlatform () {
  return Cookie.get(PLATFORM_KEY) || 'default'
}

export function setPlatform (platform: string) {
  return Cookie.set(PLATFORM_KEY, platform)
}

export function removePlatform () {
  return Cookie.remove(PLATFORM_KEY)
}

