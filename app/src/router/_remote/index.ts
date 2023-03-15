import { RouteRecordRaw } from 'vue-router'
import GEN_SYSTEM from './_system'
export const createRemoteRoutes = () => { 
  return {
    '': {
      redirect: '/home',
    },
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
    
    ...GEN_SYSTEM(),

  } as Record<string, Partial<RouteRecordRaw>>
}
