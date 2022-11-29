import { loginByPassword } from '@/api/login'
import { FirstParameter } from '@vunk/core'

export type LoginFormData = FirstParameter<typeof loginByPassword>
