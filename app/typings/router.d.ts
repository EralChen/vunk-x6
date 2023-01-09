/* 扩展 RouteMeta */
import *  as Icons from '@element-plus/icons-vue'
declare module 'vue-router' {

  interface RouteMeta {
    title?: string
    icon?: keyof typeof Icons
    alwaysShow?: boolean
    hidden?: boolean
    noCache?: boolean
    
    header?: boolean
  }
}

export {}
