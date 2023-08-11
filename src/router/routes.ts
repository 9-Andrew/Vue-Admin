export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled' },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: { title: '数据大屏', icon: 'Platform' },
  },

  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404', hidden: true },
  },
]
export const asyncRoutes = [
  {
    name: 'Acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: { title: '权限管理', icon: 'Lock' },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: { title: '用户管理', icon: 'User' },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: { title: '角色管理', icon: 'UserFilled' },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: { title: '菜单管理', icon: 'Menu' },
      },
    ],
  },
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/layout/index.vue'),
    meta: { title: '商品管理', icon: 'Goods' },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: { title: '品牌管理', icon: 'ShoppingCartFull' },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: { title: '属性管理', icon: 'ChromeFilled' },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: { title: 'SPU管理', icon: 'Calendar' },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: { title: 'SKU管理', icon: 'Orange' },
      },
    ],
  },
]
export const anyRoute = {
  path: '/:catchAll(.*)',
  redirect: '/404',
  meta: { title: '重定向', hidden: true },
}
