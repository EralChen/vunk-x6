import { RouteRecordRaw } from 'vue-router'

export default function () {
  return  {
    '/system/message': {
      redirect: '/system/message/list',
    },
    '/system/message/list': {
      component: () => import('_v/_system/message/list/index.vue'),
    },
    '/system/message/template': {
      component: undefined,
    },
    '/system/message/template$': {
      component: () => import('_v/_system/message/template/index.vue'),
      meta: {
        breadcrumb: false,
      },
    },
    '/system/message/template/add': {
      component: () => import('_v/_system/message/template/cu/index.vue'),
    },
    '/system/message/template/edit/:id': {
      component: () => import('_v/_system/message/template/cu/index.vue'),
      props: true,
    },
    '/system/message/template/detail/:id': {
      component: () => import('_v/_system/message/template/cu/index.vue'),
      props: (route) => ({
        id: route.params.id,
        detail: true,
      }),
    },
    '/system/message/config': {
      component: undefined,

    },
    '/system/message/config$': {
      component: () => import('_v/_system/message/config/index.vue'),
      meta: {
        breadcrumb: false,
      },
    },
    '/system/message/config/add': {
      component: () => import('_v/_system/message/config/cu/index.vue'),
    },
    '/system/message/config/edit/:id': {
      component: () => import('_v/_system/message/config/cu/index.vue'),
      props: true,
    },
    '/system/message/config/detail/:id': {
      component: () => import('_v/_system/message/config/cu/index.vue'),  
      props: (route) => ({
        id: route.params.id,
        detail: true,
      }),
    },
    '/system/message/sms': {
      component: undefined,
    },
    '/system/message/sms$': {
      component: () => import('_v/_system/message/sms/index.vue'),
      meta: {
        breadcrumb: false,
      },
    },
    '/system/message/sms/add': {
      component: () => import('_v/_system/message/sms/cu/index.vue'),
    },
    '/system/message/sms/edit/:id': {
      component: () => import('_v/_system/message/sms/cu/index.vue'),
      props: true,
    },
    '/system/message/sms/detail/:id': {
      component: () => import('_v/_system/message/sms/cu/index.vue'),
      props: (route) => ({
        id: route.params.id,
        detail: true,
      }),
    },
    '/system/message/ding': {
      component: undefined,

    },
    '/system/message/ding$': {
      component: () => import('_v/_system/message/ding/index.vue'),
      meta: {
        breadcrumb: false,
      },
    },
    '/system/message/ding/add': {
      component: () => import('_v/_system/message/ding/cu/index.vue'),
    },
    '/system/message/ding/edit/:id': {
      component: () => import('_v/_system/message/ding/cu/index.vue'),
      props: true,
    },
    '/system/message/ding/detail/:id': {
      component: () => import('_v/_system/message/ding/cu/index.vue'),
      props: (route) => ({
        id: route.params.id,
        detail: true,
      }),
    },
    '/system/message/weixin': {
      component: undefined,

    },
    '/system/message/weixin$': {
      component: () => import('_v/_system/message/weixin/index.vue'),
      meta: {
        breadcrumb: false,
      },
    },
    '/system/message/weixin/add': {
      component: () => import('_v/_system/message/weixin/cu/index.vue'),
    },
    '/system/message/weixin/edit/:id': {
      component: () => import('_v/_system/message/weixin/cu/index.vue'),
      props: true,
    },
    '/system/message/weixin/detail/:id': {
      component: () => import('_v/_system/message/weixin/cu/index.vue'),
      props: (route) => ({
        id: route.params.id,
        detail: true,
      }),
    },
  } as Record<string, Partial<RouteRecordRaw>>
}