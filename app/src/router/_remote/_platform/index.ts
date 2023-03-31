import Layout from '@/layouts/default/index.vue'
import { RouteRecordRaw } from 'vue-router'

export default function () {
  return  {
    '/platform': {
      component: Layout,
      meta: {
        header: true,
      },
      redirect: '/platform/tenant',
    },
    '/platform/tenant': {
      component: () => import('@/views/_platform/tenant/index.vue'),
    },
    '/platform/application': {
      component: () => import('@/views/_platform/application/index.vue'),
    },
  } as Record<string, Partial<RouteRecordRaw>>
}
