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
    redirect: '/_template-page/table/basic',
    children: [
      {
        path: 'table',
        meta: {
          title: '表格页面',
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: '基础表格',
            },
            component: () => import('@/views/_template-page/table/basic/index.vue'),
          },
        ],
       
        
      },

      {
        path: 'form',
        meta: {
          title: '表单页面',
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: '基础表单',
            },
            component: () => import('@/views/_template-page/form/basic/index.vue'),
          },
          {
          
            meta: {
              title: '多列表单',
            },
            path: 'multiple',
            component: () => import('@/views/_template-page/form/multiple/index.vue'),
          },
        ],
        
      },
      

    ],
  },
] as RouteRecordRaw[]