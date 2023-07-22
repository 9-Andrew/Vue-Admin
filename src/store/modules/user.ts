import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
import { LoginData, LoginResponse, UserInfoResponse } from '@/api/user/type'
import routes from '@/router/routes'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      TOKEN: localStorage.getItem('TOKEN'),
      menuRoutes: routes,
      userInfo: {},
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
