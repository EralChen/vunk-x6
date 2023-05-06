import { rTemplateList } from '@skzz/platform/api/system/message'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rTemplateList>['rows'][0]