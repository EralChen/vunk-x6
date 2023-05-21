import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/_play',
    component: Layout,
    meta: {
      title: '实验室',
      alwaysShow: true,
      icon: 'VideoPlay',
      header: true,
      // hidden: true,
    },
    redirect: '/_play/test1',
    children: [
      {
        path: 'test1',
        meta: {
          title: 'test1',
          hidden: true,
        },
        component: () => import('_v/_play/test1/index.vue'),
      },
      {
        path: 'test2',
        meta: {
          title: 'test2',
          hidden: true,
        },
        component: () => import('_v/_play/test2/index'),
      },
      {
        path: 'test3',
        meta: {
          title: 'test3',
          hidden: true,
        },
        component: () => import('_v/_play/test3/index'),
      },


      {
        path: 'vuesri',
        meta: {
          title: '地图组件',
        },
        children: [
          {
            path: 'basemap',
            meta: {
              title: 'basemap',
              hidden: true,
            },
            component: () => import('_v/_play/vuesri/basemap/index.vue'),
          },
          {
            path: 'wms-layer',
            meta: {
              title: '大气图层',
            },
            component: () => import('_v/_play/vuesri/wms-layer/index.vue'),
          },
        ],
      },

      {
        path: 'table',
        meta: {
          title: 'table',
          hidden: true,
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
    ],
  },
] as RouteRecordRaw[]