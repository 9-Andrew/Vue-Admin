export interface LoginData {
  username: string
  password: string
}

interface Response {
  code: number
  message: string
  ok: boolean
}
export interface LoginResponse extends Response {
  data: string
}

export interface UserInfoResponse extends Response {
  data: User
}

export interface User {
  username?: string
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: string[]
}
