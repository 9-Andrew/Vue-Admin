interface Response {
  code: number
  message: string
  ok: string
}

export interface SPU {
  id?: 3326
  createTime?: string
  updateTime?: string
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
  spuPosterList: null
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
