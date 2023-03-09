import { FirstParameter } from '@vunk/core'
import { pickObject } from '@vunk/core/shared/utils-object'
import { onBeforeRouteUpdate } from 'vue-router'

export function useResolveQueryU (fn: FirstParameter<typeof onBeforeRouteUpdate>) {
  onBeforeRouteUpdate((to, from, next) => {
    if (to.query.u) {
      fn(to, from, next)
      next({
        ...to,
        replace: true,
        query: pickObject(to.query, {
          excludes: ['u'],
        }),
      })
    } else {
      next()
    }

  })
}