import { rMenus } from '@skzz-platform/api/system/menu'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rMenus>[number]
