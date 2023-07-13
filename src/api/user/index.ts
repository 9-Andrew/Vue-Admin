import request from '@/utils/request'
import type { LoginData, LoginResponse, UserInfoResponse } from './type'
enum API {
  LOGIN_URL = 'user/login',
  USERINFO_URL = 'user/info',
}

export const reqLogin = (data: LoginData) => request.post<LoginResponse>(API.LOGIN_URL, data)
export const reqUserInfo = () => request<UserInfoResponse>(API.USERINFO_URL)
