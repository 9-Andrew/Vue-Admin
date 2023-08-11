import { createRouter, createWebHashHistory } from 'vue-router'
import { constRoutes } from './routes'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from '@/setting'
import useUserStore from '@/store/modules/user'

nprogress.configure({
  showSpinner: false,
})

let router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

router.beforeEach(async (to, _from, next) => {
  nprogress.start()
  let store = useUserStore()
  if (store.TOKEN) {
    if (to.path === '/login') {
      next(false)
    }
    if (store.userInfo.name) {
      next()
    } else {
      await store.getUserInfo()
      //万一刷新的时候是异步路由，有可能获取到用户信息但是异步路由没有加载完毕，出现空白效果
      next({ ...to })
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
router.afterEach((to, _from) => {
  document.title = `${setting.title}  | ${to.meta.title}`
  nprogress.done()
})
export default router
