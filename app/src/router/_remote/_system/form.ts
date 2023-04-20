import { RouteRecordRaw } from 'vue-router'

export default function () {
  return  {
    '/system/form': {
      redirect: '/system/form/list',
    },
    '/system/form/list': {
      component: () => import('@/views/_system/form/index.vue'),
      meta: {
        breadcrumb: false,
      },
    },
    '/system/form/add': {
      component: () => import('@/views/_system/form/cu/index.vue'),
    },
    '/system/form/edit/:id': {
      component: () => import('@/views/_system/form/cu/index.vue'),
      props: true,
    },
    '/system/form/detail/:id': {
      component: () => import('@/views/_system/form/cu/index.vue'),
      props: (route) => ({
        id: route.params.id,
        isDetail: true,
      }),
    },
  } as Record<string, Partial<RouteRecordRaw>>
}