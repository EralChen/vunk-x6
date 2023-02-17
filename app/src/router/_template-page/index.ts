import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/_template-page',
    component: Layout,
    meta: {
      title: '模板页面',
      alwaysShow: true,
      icon: 'Document',
      header: true,
    },
    redirect: '/_template-page/table',
    children: [
      {
        path: 'table',
        meta: {
          title: '表格页面',
          
        },
        component: () => import('_v/_template-page/table/index.vue'),
        
      },

      {
        path: 'form',
        meta: {
          title: '表单页面',
        },
        component: () => import('_v/_template-page/form/index.vue'),
      },
    
    ],
  },
] as RouteRecordRaw[]