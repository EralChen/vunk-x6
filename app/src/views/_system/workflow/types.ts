import { rWorkflows } from '@skzz-platform/api/system/workflow'
import { ApiReturnType } from '@vunk/core'

export type Row = ApiReturnType<typeof rWorkflows>['rows'][0]
