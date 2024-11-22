import type { loginByPassword } from '@skzz/platform/api/login'
import type { FirstParameter } from '@vunk/core'

export type LoginFormData = FirstParameter<typeof loginByPassword>
