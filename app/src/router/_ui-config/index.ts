import { RouteRecordRaw, RouterView } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/_ui-config',
    component: Layout,
    meta: {
      title: 'UI 配置',
      icon: 'Setting',
      alwaysShow: true,
      header: true,
    },
    redirect: '/_ui-config/global/color',
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
            component: () => import('_v/_ui-config/global/color/index.vue'),
          },
          {
            path: 'font',
            meta: {
              title: '字体配置',
            },
            component: () => import('_v/_ui-config/global/font/index.vue'),
          },

          {
            path: 'gap',
            meta: {
              title: '间距配置',
            },
            component: () => import('_v/_ui-config/global/gap/index.vue'),
          },
        ],
      },
      
      {
        path: 'menu',
        meta: {
          title: '菜单配置',
        },
        redirect: '/_ui-config/global',
        children: [
          {
            path: 'base',
            meta: {
              title: '基础配置',
            },
            component: () => import('_v/_ui-config/menu/base/index.vue'),

          },
          {
            path: 'header',
            meta: {
              title: '头部配置',
            },
            component: () => import('_v/_ui-config/menu/header/index.vue'),
          },
        ],
        
      },
    
    ],
  },
] as RouteRecordRaw[]