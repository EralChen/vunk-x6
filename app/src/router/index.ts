import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout } from '@/layouts/default'
import { SplitGrid } from '@/layouts/split-grid/index'
import { createRouter, createWebHashHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/graph',
  },

  {
    path: '/graph',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'graph',
        component: () => import('_v/graph/index.vue'),

        children: [
          {
            path: 'memory',
            name: 'memory',
            component: () => import('_v/memory/index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/home',
    component: SplitGrid,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('_v/home/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(`${import.meta.env.VITE_BASE_URL}/`),
  routes,
})

export default router
