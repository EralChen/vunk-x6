import { rMessageList } from '@skzz-platform/api/system/message/list'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rMessageList>['rows'][0]