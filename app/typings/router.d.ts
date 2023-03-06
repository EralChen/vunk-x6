/* 扩展 RouteMeta */
import *  as Icons from '@element-plus/icons-vue'
declare module 'vue-router' {

  interface RouteMeta {
    /**
     * 标题
     */
    title?: string
    
    /**
     * 图标
     */
    icon?: keyof typeof Icons
    /**
     * 是否一直显示，不会收到路由合并的影响
     */
    alwaysShow?: boolean

    /**
     * 是否隐藏
     */
    hidden?: boolean

    /**
     * 缓存
     */
    // noCache?: boolean
    
    /**
     * 控制当前路由是否出现在面包屑 
     * */
    breadcrumb?: boolean
    
    /**
     * 如果有路由被 header标记, 侧边菜单则仅展示该路由下的子路由
     * */ 
    header?: boolean 


  }
}

export {}
