import { rWeixinList } from '@skzz/platform/api/system/message'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rWeixinList>['rows'][0]