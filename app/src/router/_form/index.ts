import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/system/form',
    component: Layout,
    meta: {
      title: '表单配置',
      alwaysShow: true,
      icon: 'Tickets',
      header: true,
    },
    redirect: '/system/form/list',
    children: [
      {
        path: 'list',
        meta: {
          title: '表单配置',
        },
        component: () => import('_v/_system/form/index.vue'),
      },
      {
        path: 'add',
        meta: {
          title: '新增表单配置',
          hidden: true,
        },
        component: () => import('_v/_system/form/cu/index.vue'),
      },
      {
        path: 'edit/:id',
        props: true,
        meta: {
          title: '修改表单配置',
          hidden: true,
        },
        component: () => import('_v/_system/form/cu/index.vue'),
      },
      {
        path: 'detail/:id',
        props: (route) => ({
          id: route.params.id,
          isDetail: true,
        }),
        meta: {
          title: '表单配置查看',
          hidden: true,
        },
        component: () => import('_v/_system/form/cu/index.vue'),
      },
    ],
  },
] as RouteRecordRaw[]