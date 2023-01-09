import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export const useViewsStore = defineStore('views', () => {
  const baseView = shallowRef<RouteRecordRaw&{href: string}>()
  const setBaseView = (route: RouteRecordRaw&{href: string}) => {
    baseView.value = route
  }


  return { 
    baseView,
    setBaseView,

  }
})
