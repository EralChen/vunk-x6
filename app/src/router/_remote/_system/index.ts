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
    '/system/user': {
      component: () => import('@/views/_system/user/index.vue'),
    },

    '/system/workflow': {
      redirect: '/system/workflow/list',
    },
    '/system/workflow/list': {
      component: () => import('@/views/_system/workflow/index.vue'),
    },
    '/system/workflow/list/read/:id': {
      component: () => import('@/views/_system/workflow/read/index.vue'),
      props: true,
      meta: {
        hidden: true,
        tagsView: false,
      },
    },
    '/system/workflow/list/nodes/:flowId': {
      component: () => import('@/views/_system/workflow/nodes/index.vue'),
      props: true,
      meta: {
        hidden: true,
        tagsView: false,
      },
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