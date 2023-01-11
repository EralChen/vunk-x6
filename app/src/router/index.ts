import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
import UI_CONFIG from './ui-config'
import TEMPLATE_PAGE from './template-page'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
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
        meta: {
          title: '首页',
        },
        component: () => import('_v/home/index.vue'),
      },
    ],
  },

  {
    path: '/login/:platform',
    props: true,
    meta: {
      display: 0,
    },
    component: () => import('_v/login/index.vue'),
  },

  ...UI_CONFIG,
  ...TEMPLATE_PAGE,
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL + '/'),
  routes,
})

export default router