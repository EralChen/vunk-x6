import Layout from '@/layouts/default/index.vue'
import { RouteRecordRaw } from 'vue-router'

export default function () {
  return  {
    '/system': {
      component: Layout,
      meta: {
        header: true,
        icon: '',
      },
      redirect: '/system/role',
    },
    '/system$': {
      component: null,
      redirect: '/system/role',
    },
    '/system/role': {
      component: () => import('@/views/_system/role/index.vue'),
    },
    '/system/menu': {
      component: () => import('@/views/_system/menu/index.vue'),
    },
  } as Record<string, Partial<RouteRecordRaw>>
}