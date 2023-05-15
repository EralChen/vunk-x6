import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { pickObject } from '@vunk/core/shared/utils-object'

type BaseView = RouteRecordRaw & { fullPath: string }

export const useViewsStore = defineStore('views', () => {
  const currentBaseView = shallowRef<BaseView>()
  const setCurrentBaseView = (route: BaseView) => {
    currentBaseView.value = route
  }



  const baseViewsRecord = shallowRef<Record<string, BaseView>>({})
  const addBaseViewToRecord = (fullPath: string, route: RouteRecordRaw) => {
    baseViewsRecord.value[fullPath] = {
      ...route,
      fullPath: fullPath,
    }
  }


  const findBaseViewByFullPath = (fullPath: string) => {
    const keys = Object.keys(baseViewsRecord.value)
    // 最长的 key
    let key = ''
    keys.forEach((k) => {
      if (fullPath.startsWith(k) && k.length > key.length) {
        key = k
      }
    })
    if (key) {
      return baseViewsRecord.value[key]
    } 

  }



  
  const visitedViews = ref<RouteLocationNormalizedLoaded[]>([])
  const addVisitedView = (route: RouteLocationNormalizedLoaded) => {
    if (visitedViews.value.some((v) => {
      return v.fullPath === route.fullPath
    })) {
      return
    }

    visitedViews.value.push( 
      pickObject(route, {
        // [TODO] 持久化储存的数据是否需要这部分
        excludes: ['matched', 'redirectedFrom'],
      }) as RouteLocationNormalizedLoaded,
    )
  }

  const setVisitedViews = (routes: RouteLocationNormalizedLoaded[]) => {
    visitedViews.value = routes
  }


  const delVisitedViewByFullpath = (fullPath: string) => {
    const index = visitedViews.value.findIndex((v) => {
      return v.fullPath === fullPath
    })
    let item: RouteLocationNormalizedLoaded | undefined
    if (index >= 0) {
      item = visitedViews.value.splice(index, 1)[0]
    }

    return {
      index,
      item, 
    }
   
  }

  
  // const cachedViews = shallowRef<RouteRecordRaw[]>([])

  return { 
    currentBaseView,
    setCurrentBaseView,

    baseViewsRecord,
    addBaseViewToRecord,
    findBaseViewByFullPath,

    visitedViews,
    setVisitedViews,
    addVisitedView,
    delVisitedViewByFullpath,

  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['visitedViews'],
      },
    ],
  },
})
