import { rMessageConfigList } from '@skzz-platform/api/system/message'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rMessageConfigList>['rows'][0]