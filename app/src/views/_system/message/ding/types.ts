import { rDingList } from '@skzz/platform/api/system/message'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rDingList>['rows'][0]