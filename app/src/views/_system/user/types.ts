import { rUsers } from '@skzz/platform/api/system/user'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rUsers>['rows'][0]
