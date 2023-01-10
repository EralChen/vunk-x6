/* 扩展 RouteMeta */
import *  as Icons from '@element-plus/icons-vue'
declare module 'vue-router' {

  interface RouteMeta {
    title?: string
    icon?: keyof typeof Icons
    alwaysShow?: boolean
    hidden?: boolean
    noCache?: boolean
    
    /**
     * 如果有路由被 header标记, 侧边菜单则仅展示该路由下的子路由
     * */ 
    header?: boolean 
  }
}

export {}
