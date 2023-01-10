import { RouteRecordRaw, RouterView } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/ui-config',
    component: Layout,
    meta: {
      title: 'UI 配置',
      icon: 'Setting',
      alwaysShow: true,
      header: true,
    },
    redirect: '/ui-config/global/color',
    children: [
      {
        path: 'global',
        meta: {
          title: '全局配置',
        },
        component: RouterView,
        children: [
          {
            path: 'color',
            meta: { 
              title: '颜色配置',
            },
            component: () => import('_v/ui-config/global/color/index.vue'),
          },
          {
            path: 'font',
            meta: {
              title: '字体配置',
            },
            component: () => import('_v/ui-config/global/font/index.vue'),
          },

          {
            path: 'gap',
            meta: {
              title: '间距配置',
            },
            component: () => import('_v/ui-config/global/gap/index.vue'),
          },
        ],
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