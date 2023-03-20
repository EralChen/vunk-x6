import Layout from '@/layouts/default/index.vue'
import { RouteRecordRaw } from 'vue-router'

export default function () {
  return  {
    '/system': {
      component: Layout,
      meta: {
        header: true,
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
    '/system/workflow': {
      component: () => import('@/views/_system/workflow/index.vue'),
    },
    '/system/data-model': {
      component: () => import('@/views/_system/data-model/index.vue'),
    },
    '/system/message': {
      redirect: '/system/message/list',
    },
    '/system/message/list': {
      component: () => import('@/views/_system/message/list/index.vue'),
    },
    '/system/message/template': {
      component: () => import('@/views/_system/message/template/index.vue'),
    },
    '/system/message/config': {
      component: () => import('@/views/_system/message/config/index.vue'),
    },
  } as Record<string, Partial<RouteRecordRaw>>
}