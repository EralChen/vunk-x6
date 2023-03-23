import { restFetch, withPlatform } from '@skzz-platform/shared/fetch/platform'

export const snowFlake = withPlatform((...args) => restFetch.snowFlake(...args))
