import type { restFetch } from '@skzz/platform/shared/fetch/platform'
import type { FirstParameter } from '@vunk/shared'

export type LoginQuery = FirstParameter<typeof restFetch.login> & {
  loginTenantId: string
}
