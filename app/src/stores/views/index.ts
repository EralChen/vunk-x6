import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
type BaseView = RouteRecordRaw & { fullpath: string }

export const useViewsStore = defineStore('views', () => {
  const currentBaseView = shallowRef<BaseView>()
  const setCurrentBaseView = (route: BaseView) => {
    currentBaseView.value = route
  }

  const baseViewsRecord = shallowRef<Record<string, BaseView>>({})
  const addBaseViewToRecord = (fullPath: string, route: RouteRecordRaw) => {
    baseViewsRecord.value[fullPath] = {
      ...route,
      fullpath: fullPath,
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

  
  // const cachedViews = shallowRef<RouteRecordRaw[]>([])

  return { 
    currentBaseView,
    setCurrentBaseView,

    baseViewsRecord,
    addBaseViewToRecord,

    visitedViews,
    addVisitedView,

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
