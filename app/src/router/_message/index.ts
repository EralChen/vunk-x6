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
          {
            path: 'edit/:id',
            meta: {
              title: '消息配置修改',
              hidden: true,
            },
            props: true,
            component: () => import('_v/_system/message/config/cu/index.vue'),
          },
          {
            path: 'detail/:id',
            meta: {
              title: '消息配置详情',
              hidden: true,
            },
            props: (route) => ({
              id: route.params.id,
              detail: true,
            }),
            component: () => import('_v/_system/message/config/cu/index.vue'),
          },
        ],
      },
      {
        path: 'sms',
        meta: {
          title: '短信配置',
        },
        children: [
          {
            path: '',
            meta: {
              title: '短信配置',
              breadcrumb: false,
            },
            component: () => import('_v/_system/message/sms/index.vue'),
          },
          {
            path: 'add',
            meta: {
              title: '短信配置新增',
              hidden: true,
            },
            component: () => import('_v/_system/message/sms/cu/index.vue'),
          },
          {
            path: 'edit/:id',
            meta: {
              title: '短信配置修改',
              hidden: true,
            },
            props: true,
            component: () => import('_v/_system/message/sms/cu/index.vue'),
          },
          {
            path: 'detail/:id',
            meta: {
              title: '短信配置详情',
              hidden: true,
            },
            props: (route) => ({
              id: route.params.id,
              detail: true,
            }),
            component: () => import('_v/_system/message/sms/cu/index.vue'),
          },
        ],
      },
      {
        path: 'ding',
        meta: {
          title: '专有钉钉配置',
        },
        children: [
          {
            path: '',
            meta: {
              title: '专有钉钉配置',
              breadcrumb: false,
            },
            component: () => import('_v/_system/message/ding/index.vue'),
          },
          {
            path: 'add',
            meta: {
              title: '专有钉钉新增',
              hidden: true,
            },
            component: () => import('_v/_system/message/ding/cu/index.vue'),
          },
          {
            path: 'edit/:id',
            meta: {
              title: '专有钉钉修改',
              hidden: true,
            },
            props: true,
            component: () => import('_v/_system/message/ding/cu/index.vue'),
          },
          {
            path: 'detail/:id',
            meta: {
              title: '专有钉钉详情',
              hidden: true,
            },
            props: (route) => ({
              id: route.params.id,
              detail: true,
            }),
            component: () => import('_v/_system/message/ding/cu/index.vue'),
          },
        ],
      },
      {
        path: 'weixin',
        meta: {
          title: '微信配置',
        },
        children: [
          {
            path: '',
            meta: {
              title: '微信配置',
              breadcrumb: false,
            },
            component: () => import('_v/_system/message/weixin/index.vue'),
          },
          {
            path: 'add',
            meta: {
              title: '微信新增',
              hidden: true,
            },
            component: () => import('_v/_system/message/weixin/cu/index.vue'),
          },
          {
            path: 'edit/:id',
            meta: {
              title: '微信修改',
              hidden: true,
            },
            props: true,
            component: () => import('_v/_system/message/weixin/cu/index.vue'),
          },
          {
            path: 'detail/:id',
            meta: {
              title: '微信详情',
              hidden: true,
            },
            props: (route) => ({
              id: route.params.id,
              detail: true,
            }),
            component: () => import('_v/_system/message/weixin/cu/index.vue'),
          },
        ],
      },
    ],
  },
] as RouteRecordRaw[]