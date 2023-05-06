import { QUERY_U } from './use-resolve-query-u'
import { useRoute, useRouter } from 'vue-router'
export function usePostQueryU () {
  const route = useRoute()
  const router = useRouter()
  const postQueryU = () => router.replace({
    ...route,
    query: {
      ...route.query,
      [QUERY_U]: 1,
    },
  })
  return {
    postQueryU,
  }
}
