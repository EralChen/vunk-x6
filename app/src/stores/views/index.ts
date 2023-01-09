import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export const useViewsStore = defineStore('views', () => {
  const baseView = shallowRef<RouteRecordRaw & { href: string }>()
  const setBaseView = (route: RouteRecordRaw & { href: string }) => {
    baseView.value = route
  }
  
  const visitedViews = shallowRef<RouteRecordRaw[]>([])
  const addVisitedView = (route: RouteRecordRaw) => {
    if (visitedViews.value.some((v) => v.path === route.path)) return
    visitedViews.value.push(route)
  }

  
  // const cachedViews = shallowRef<RouteRecordRaw[]>([])

  return { 
    baseView,
    setBaseView,

    visitedViews,
    addVisitedView,

  }
})
