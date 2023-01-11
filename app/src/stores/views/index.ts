import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
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
    
    visitedViews.value.push(route)
  }

  const delVisitedViewByFullpath = (fullPath: string) => {
    const index = visitedViews.value.findIndex((v) => {
      return v.fullPath === fullPath
    })
    if (index >= 0) {
      visitedViews.value.splice(index, 1)
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
