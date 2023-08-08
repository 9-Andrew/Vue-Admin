interface Response {
  code: number
  message: string
  ok: string
}
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
export interface RoleResponse extends Response {
  data: {
    records: Role[]
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
export interface Menu {
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
  children: Menu[]
  select: boolean
}
export interface MenuResponse extends Response {
  data: Menu[]
}
