import { RouteRecordRaw } from 'vue-router'
import GEN_SYSTEM from './_system'
import GEN_PLATFORM from './_platform'
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
    ...GEN_PLATFORM(),

  } as Record<string, Partial<RouteRecordRaw>>
}
