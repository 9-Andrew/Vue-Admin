interface Response {
  code: number
  message: string
  ok: string
}
export interface Permission {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children: Permission[]
}
export interface PermissionResponse extends Response {
  data: Permission[]
}
export interface PermissionParams {
  id?: number
  pid: number
  level: number
  name: string
  code: string
}
