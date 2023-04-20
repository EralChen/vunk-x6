import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
import _UI_CONFIG from './_ui-config'
import _TEMPLATE_PAGE from './_template-page'
import _PLAY from './_play'

import { getPlatform } from '@/utils'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'home',
    },
    meta: {
      display: 0,
    },
  }, 

  {
    path: '/home',
    component: Layout,

    meta: {
      display: 0,
    },
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('_v/home/index.vue'),
      },
    ],
  },
  
  {
    path: '/login',
    meta: {
      display: 0,
    },
    redirect: '/login' + '/' + getPlatform(),
  },

  {
    path: '/login/:platform',
    props: true,
    meta: {
      display: 0,
    },
    component: () => import('_v/_login/index.vue'),
  },
  ..._UI_CONFIG,
  ..._TEMPLATE_PAGE,
  ..._PLAY,
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL + '/'),
  routes,
})

export default router