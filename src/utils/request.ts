import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  let store = useUserStore()
  if (store.TOKEN) {
    config.headers.token = store.TOKEN
  }
  return config
})
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let status = error.request.status
    let message = ''
    switch (status) {
      case 401:
        message = 'token失效'
        break
      case 403:
        message = '权限不足'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器发生错误'
        break
      default:
        message = '网络异常'
        break
    }
    ElMessage({ type: 'error', message })
    return Promise.reject(error)
  },
)
export default request
