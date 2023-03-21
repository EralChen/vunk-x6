import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/_play',
    component: Layout,
    meta: {
      title: '游乐',
      alwaysShow: true,
      icon: 'VideoPlay',
      header: true,
    },
    redirect: '/_play/test1',
    children: [
      {
        path: 'test1',
        meta: {
          title: 'test1',
        },
        component: () => import('_v/_play/test1/index.vue'),
      },

      {
        path: 'vuesri',
        meta: {
          title: 'vuesri',
        },
        children: [
          {
            path: 'basemap',
            meta: {
              title: 'basemap',
            },
            component: () => import('_v/_play/vuesri/basemap/index.vue'),
          },
        ],
      },

      {
        path: 'table',
        meta: {
          title: 'table',
        },
        children: [
          {
            path: 'scroll',
            meta: {
              title: 'table-scroll',
            },
            component: () => import('_v/_play/table/scroll/index.vue'),
          },
        ],
      },
      {
        path: 'g6',
        meta: {
          title: 'G6',
        },
        component: () => import('_v/_play/g6/index.vue'),
      },
      
      {
        path: 'g6-test',
        meta: {
          title: 'G6-test',
        },
        component: () => import('_v/_play/g6-test/index.vue'),
      },
    ],
  },
] as RouteRecordRaw[]