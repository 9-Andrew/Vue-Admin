export interface LoginData {
  username: string
  password: string
}

export interface LoginResponse {
  code: number
  data: { token: string }
}

export interface UserInfoResponse {
  code: number
  data: { checkUser: User }
}

interface User {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
