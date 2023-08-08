import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from '@/setting'
import useUserStore from '@/store/modules/user'

nprogress.configure({
  showSpinner: false,
})

let router = createRouter({
  history: createWebHashHistory(),
  routes,
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
    if (!store.userInfo.username) {
      await store.getUserInfo()
    }
    next()
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
