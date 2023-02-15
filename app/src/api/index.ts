import { restFetch as publicRestFetch } from '@skzz-platform/shared/fetch/public'
import { restFetch as platformRestFetch } from '@skzz-platform/shared/fetch/platform'

publicRestFetch.baseURL = import.meta.env.VITE_BASE_URL + '/data'
platformRestFetch.DEV = import.meta.env.DEV
