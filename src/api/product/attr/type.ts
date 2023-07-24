interface Response {
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

interface AtrrValue {
  id?: number
  valueName: string
  attrId?: number
  createTime?: null
  updateTime?: null
}

export interface Attr {
  id?: number
  createTime?: any
  updateTime?: any
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AtrrValue[]
}
export interface AttrResponse extends Response {
  data: Attr[]
}
