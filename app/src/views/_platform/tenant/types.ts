import { rTenants } from '@skzz/platform/api/platform/tenant'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rTenants>['rows'][0]

