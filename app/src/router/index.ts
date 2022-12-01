import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DEMO_MASTER from './_demo-master'
import Layout from '@/layouts/default/index.vue'
export const routes: Array<RouteRecordRaw> = [
  ...DEMO_MASTER,
  {
    path: '/',
    redirect: '/home',
  },
  
  {
    path: '/home',
    component: Layout,
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
    component: () => import('_v/login/index.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL + '/'),
  routes,
})

export default router