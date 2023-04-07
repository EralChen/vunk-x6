import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/system/message',
    component: Layout,
    meta: {
      title: '消息',
      alwaysShow: true,
      icon: 'VideoPlay',
      header: true,
    },
    redirect: '/system/message/list',
    children: [
      {
        path: 'list',
        meta: {
          title: '消息数据',
        },
        component: () => import('_v/_system/message/list/index.vue'),
      },
      {
        path: 'template',
        meta: {
          title: '消息模板',
        },
        children: [
          {
            path: '',
            meta: {
              title: '消息模板',
              breadcrumb: false,
            },
            component: () => import('_v/_system/message/template/index.vue'),
          },
          {
            path: 'add',
            meta: {
              title: '消息模板新增',
              hidden: true,
            },
            component: () => import('_v/_system/message/template/cu/index.vue'),
          },
          {
            path: 'edit/:id',
            meta: {
              title: '消息模板修改',
              hidden: true,
            },
            props: true,
            component: () => import('_v/_system/message/template/cu/index.vue'),
          },
          {
            path: 'detail/:id',
            meta: {
              title: '消息模板修改',
              hidden: true,
            },
            props: (route) => ({
              id: route.params.id,
              detail: true,
            }),
            component: () => import('_v/_system/message/template/cu/index.vue'),
          },
        ],
      },
      {
        path: 'config',
        meta: {
          title: '消息配置',
        },
        children: [
          {
            path: '',
            meta: {
              title: '消息配置',
              breadcrumb: false,
            },
            component: () => import('_v/_system/message/config/index.vue'),
          },
          {
            path: 'add',
            meta: {
              title: '消息配置新增',
              hidden: true,
            },
            component: () => import('_v/_system/message/config/cu/index.vue'),
          },
        ],
      },
    ],
  },
] as RouteRecordRaw[]