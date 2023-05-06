import { computed } from 'vue'
import { useRouterTo } from './use-router-to'
export const useRouteActive = (endsWith: string) => {
  const { routerBack, route } = useRouterTo()
  return  computed({
    get () {
      return route.path.endsWith(endsWith)
    },
    set (value) {
      if (!value) {
        // 表示要退出当前页面
        routerBack({
          path: endsWith,
        })
      }
      return value
    },
  })
}
