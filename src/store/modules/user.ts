import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index'
import { LoginData } from '@/api/user/type'
let useUserStore = defineStore('user', {
  state: () => {
    return {
      TOKEN: localStorage.getItem('TOKEN'),
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
  },
})
export default useUserStore
