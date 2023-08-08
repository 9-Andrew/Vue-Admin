interface Response {
  code: number
  message: string
  ok: string
}
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}
export interface UserResponse extends Response {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    orders?: object
    optimizeCountSql?: boolean
    hitCount?: boolean
    countId?: null
    maxLimit?: null
    searchCount: boolean
    pages: number
  }
}
export interface UserRole {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
export interface UserRoleResponse extends Response {
  data: {
    assignRoles: UserRole[]
    allRolesList: UserRole[]
  }
}
export interface SetUserRoleData {
  roleIdList: number[]
  userId: number
}
