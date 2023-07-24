export interface Response {
  code: number
  message: string
  ok: string
}

export interface Category {
  id: number | string
  name: string
  createTime: string
  updateTime: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponse extends Response {
  data: Category[]
}
