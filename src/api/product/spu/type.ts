import type { Trademark } from '../trademark/type'
interface Response {
  code: number
  message: string
  ok: string
}

export interface SPU {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SPUImage[]
  spuPosterList?: null
  createTime?: string
  updateTime?: string
}
export interface SPUResponse extends Response {
  data: {
    records: SPU[]
    total: number
    size: number
    current: number
    orders: any
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
export interface AllTrademarkResponse extends Response {
  data: Trademark[]
}
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number | string
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValue[]
  editable?: boolean
  newName?: string
}
interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number | string
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
export interface SPUSaleAttrListResponse extends Response {
  data: SaleAttr[]
}
export interface SPUImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
export interface SPUImageListResponse extends Response {
  data: SPUImage[]
}

export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponse extends Response {
  data: HasSaleAttr[]
}
