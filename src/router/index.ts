import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'

nprogress.configure({
  showSpinner: false
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

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
