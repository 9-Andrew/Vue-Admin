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

export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  createTime?: null
  updateTime?: null
  viewable?: boolean
}

export interface Attr {
  id?: number
  createTime?: any
  updateTime?: any
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
  attrIdAndValue?: ''
}
export interface AttrResponse extends Response {
  data: Attr[]
}
