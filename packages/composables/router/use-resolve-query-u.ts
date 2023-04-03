import { FirstParameter } from '@vunk/core'
import { pickObject } from '@vunk/core/shared/utils-object'
import { onBeforeRouteUpdate } from 'vue-router'
export const QUERY_U = '__u'
export function useResolveQueryU (fn: FirstParameter<typeof onBeforeRouteUpdate>) {
  onBeforeRouteUpdate((to, from, next) => {
    if (to.query[QUERY_U]) {
      fn(to, from, next)
      next({
        ...to,
        replace: true,
        query: pickObject(to.query, {
          excludes: [QUERY_U],
        }),
      })
    } else {
      next()
    }

  })
}