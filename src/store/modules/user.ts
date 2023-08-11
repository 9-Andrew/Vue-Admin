import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
import type {
  LoginData,
  LoginResponse,
  UserInfoResponse,
} from '@/api/user/type'
import type { UserState } from './type/type'
import { constRoutes, asyncRoutes, anyRoute } from '@/router/routes'
import router from '@/router'
import * as _ from 'lodash'

const filterRoutes = (asyncRoutes: any, userRoutes: any) => {
  return asyncRoutes.filter((item: any) => {
    if (userRoutes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRoutes(item.children, userRoutes)
      }
      return item
    }
  })
}
const resetRouter = () => {
  // 获取所有路由
  router.getRoutes().forEach((route) => {
    // 获取路由name
    const { name } = route
    // 移除所有路由
    router.hasRoute(name as string) && router.removeRoute(name as string)
  })
  // 添加常量路由
  ;[...constRoutes].forEach((route: any) => {
    router.addRoute(route)
  })
}
const useUserStore = defineStore('user', {
  state(): UserState {
    return {
      TOKEN: localStorage.getItem('TOKEN'),
      menuRoutes: constRoutes,
      userInfo: {
        avatar: '',
        name: '',
        roles: [],
        buttons: [],
        routes: [],
      },
    }
  },
  actions: {
    async userLogin(data: LoginData) {
      let result: LoginResponse = await reqLogin(data)
      if (result.code == 200) {
        this.TOKEN = result.data
        localStorage.setItem('TOKEN', this.TOKEN!)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async getUserInfo() {
      let result: UserInfoResponse = await reqUserInfo()
      if (result.code == 200) {
        this.userInfo = result.data
        let userRoutes = filterRoutes(
          _.cloneDeep(asyncRoutes),
          result.data.routes,
        )
        this.menuRoutes = [...constRoutes, ...userRoutes, anyRoute]
        userRoutes.concat(anyRoute).forEach((item: any) => {
          router.addRoute(item)
        })
      }
    },
    async logout() {
      let result: any = await reqLogout()
      if (result.code == 200) {
        localStorage.clear()
        this.$reset()
      }
      setTimeout(() => {
        resetRouter()
      })
    },
  },
})
export default useUserStore
