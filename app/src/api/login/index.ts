import { usePlatformStore } from '@/stores/platform'
import { restFetch } from '@/api/_request/base'
import * as baseLogin from './base'
import { AnyFunc } from '@vunk/core'

function withPlatform <T extends AnyFunc> (fn: T) {
  return (async (...args) => {
    const platformStore = usePlatformStore()
    const platform = platformStore.getPlatformInfo()
    restFetch.baseURL = platform.url
    return fn(...args)
  }) as T
}

export const rCaptcha = withPlatform(baseLogin.rCaptcha)
export const rUserInfo = withPlatform(baseLogin.rUserInfo)
export const logout = withPlatform(baseLogin.logout)
export const loginByPassword = withPlatform(baseLogin.loginByPassword)

