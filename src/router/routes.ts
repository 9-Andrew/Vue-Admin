export default [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'home',
    meta: { title: 'layout' },
    children: [
      {
        path: 'home',
        component: () => import('@/views/index.vue'),
        meta: { title: '首页' },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'login',
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { title: '404', hidden: true },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    meta: { title: '重定向', hidden: false },
  },
]
