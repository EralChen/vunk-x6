import { AnyFunc } from '@vunk/core'
import { pickObject } from '@vunk/core/shared/utils-object'
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

export const QUERY_U = '__u'


export function useResolveQueryU () {
  const listeners = ref<AnyFunc[]>([])

  const addListener = (listener: AnyFunc) => {
    listeners.value.push(listener)
    return () => removeListener(listener)
  }

  const removeListener = (listener: AnyFunc) => {
    listeners.value = listeners.value.filter(l => l !== listener)
  }
  
  onBeforeRouteUpdate(async (to, from, next) => {
    if (to.query[QUERY_U]) {
      for (const listener of listeners.value) {
        await listener(to, from, next)
      }
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

  return {
    addListener,
    removeListener,
  }
}


