import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/ui-config',
    component: (() => Layout)(),
    meta: {
      title: 'UI 配置',
      alwaysShow: true,
    },
    children: [
      {
        path: 'global',
        meta: {
          title: '全局配置',
        },
        component: () => import('_v/ui-config/global/index.vue'),
      },
      {
        path: 'menu',
        meta: {
          title: '菜单配置',
        },
        component: () => import('_v/ui-config/menu/index.vue'),
      },
    
    ],
  },
] as RouteRecordRaw[]