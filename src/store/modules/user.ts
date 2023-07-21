import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user/index'
import { LoginData } from '@/api/user/type'
import routes from '@/router/routes'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      TOKEN: localStorage.getItem('TOKEN'),
      menuRoutes: routes,
      userInfo: { username: '', avatar: '' },
    }
  },
  actions: {
    async userLogin(data: LoginData) {
      let result = await reqLogin(data)
      if (result.code == 200) {
        this.TOKEN = result.data.token!
        localStorage.setItem('TOKEN', this.TOKEN!)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    async getUserInfo() {
      let result = await reqUserInfo()
      if (result.code == 200) {
        this.userInfo = result.data.checkUser
      }
    },
    logout(){
      localStorage.clear()
      this.$reset()
    }
  },
})
export default useUserStore
