import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'

export const createRemoteRoutes = () => { 
  return {
    '/dashboard': {
      component: () => import('@/views/dashboard/index.vue'),
    },
    '/system': {
      component: Layout,
    },
    '/system/menu': {
      component: () => import('@/views/system/menu/index.vue'),
    },
  } as Record<string, Partial<RouteRecordRaw>>
}
