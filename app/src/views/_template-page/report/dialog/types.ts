import type { rRoles } from '@skzz/platform/api/system/role'
import type { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rRoles>['rows'][0]
