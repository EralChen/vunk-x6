import { rSmsList } from '@skzz/platform/api/system/message'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rSmsList>['rows'][0]