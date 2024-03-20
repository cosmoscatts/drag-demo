export default [
  {
    path: '/component-manage',
    name: 'ComponentManage',
    component: () => import('~/pages/component-manage/index.vue'),
    meta: {
      title: '组态管理',
      requiresAuth: true,
      cached: false,
      layout: 'default',
    },
  },
  {
    path: '/meta2d',
    name: 'Meta2d',
    component: () => import('~/pages/meta2d/index.vue'),
    meta: {
      title: '组态管理2',
      requiresAuth: true,
      cached: false,
      layout: 'default',
    },
  },
]
