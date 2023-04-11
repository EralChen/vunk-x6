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
    ],
  },
] as RouteRecordRaw[]