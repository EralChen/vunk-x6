import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'

export const createRemoteRoutes = () => { 
  return {
    '/dashboard': {
      component: () => import('@/views/home/index.vue'),
      meta: {
        
      },
    },
    '/tenant-setup': {
      meta: {
        alwaysShow: true,
      },
    },
    '/system': {
      component: Layout,
      meta: {
        header: true,
      },
    },
    '/system/role': {
      component: () => import('@/views/system/role/index.vue'),
    },
    '/system/menu': {
      component: () => import('@/views/system/menu/index.vue'),
    },
  } as Record<string, Partial<RouteRecordRaw>>
}
