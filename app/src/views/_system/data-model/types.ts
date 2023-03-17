import { rDataModels } from '@skzz-platform/api/system/data-model'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rDataModels>['rows'][0]
