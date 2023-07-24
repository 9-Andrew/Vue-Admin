import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
import type {
  LoginData,
  LoginResponse,
  UserInfoResponse,
} from '@/api/user/type'
import type { UserState } from './type/type'
import routes from '@/router/routes'

const useUserStore = defineStore('user', {
  state(): UserState {
    return {
      TOKEN: localStorage.getItem('TOKEN'),
      menuRoutes: routes,
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
      }
    },
    async logout() {
      let result: any = await reqLogout()
      if (result.code == 200) {
        localStorage.clear()
        this.$reset()
      }
    },
  },
})
export default useUserStore
