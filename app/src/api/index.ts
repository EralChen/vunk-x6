import { restFetchConfig as publicRestFetchConfig } from '@skzz-platform/shared/fetch/public'
import { restFetchConfig as platformRestFetchConfig } from '@skzz-platform/shared/fetch/platform'

publicRestFetchConfig.baseURL = import.meta.env.VITE_API_BASE_URL + '/data'
platformRestFetchConfig.DEV = import.meta.env.DEV


