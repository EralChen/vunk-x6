import { withPlatform } from '@skzz-template/shared/fetch/platform'
import * as baseLogin from './base'


export const rCaptcha = withPlatform(baseLogin.rCaptcha)
export const rUserInfo = withPlatform(baseLogin.rUserInfo)
export const logout = withPlatform(baseLogin.logout)
export const loginByPassword = withPlatform(baseLogin.loginByPassword)
export const rMenus = withPlatform(baseLogin.rMenus)
export const rTAInfo  = withPlatform(baseLogin.rTAInfo)
