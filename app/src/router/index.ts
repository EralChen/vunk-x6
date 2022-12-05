import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
import UI_CONFIG from './ui-config'
export const routes: Array<RouteRecordRaw> = [

  {
    path: '/home',
    component: (() => Layout)(),
    meta: {
      display: 0,
    },
    children: [
      {
        path: '',
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL + '/'),
  routes,
})

export default router