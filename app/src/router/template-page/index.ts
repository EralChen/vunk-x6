import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export default [
  {
    path: '/template-page',
    component: Layout,
    meta: {
      title: '模板页面',
      alwaysShow: true,
      icon: 'Document',
      header: true,
    },
    redirect: '/template-page/table',
    children: [
      {
        path: 'table',
        meta: {
          title: '表格页面',
          
        },
        component: () => import('_v/template-page/table/index.vue'),
        
      },
    
    ],
  },
] as RouteRecordRaw[]