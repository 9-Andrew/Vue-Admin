import { createRouter, createWebHashHistory } from 'vue-router'

let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('@/views/index.vue'), name: 'home' },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
      name: 'login',
    },
    {
      path: '/404',
      component: () => import('@/views/404.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404',
    },
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
