import { withPlatform } from '@/api/_request/base'
import * as baseLogin from './base'


export const rCaptcha = withPlatform(baseLogin.rCaptcha)
export const rUserInfo = withPlatform(baseLogin.rUserInfo)
export const logout = withPlatform(baseLogin.logout)
export const loginByPassword = withPlatform(baseLogin.loginByPassword)

