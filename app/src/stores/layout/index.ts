import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const asideInfo = reactive({
    menuCollapse: false,
  })

  return { 
    asideInfo,
  }
})
